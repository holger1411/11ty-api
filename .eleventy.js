// .eleventy.js
const fetch = require("node-fetch");

module.exports = eleventyConfig => {
  eleventyConfig.addNunjucksAsyncShortcode("githubProfile", fetchGitHubUser);

  return {
    dir: {
      input: "./",
      output: "_site",
    }
  };
};

async function fetchGitHubUser(githubHandle) {
  console.log(`Fetching GitHub data... ${githubHandle}`);
  const github = await fetch(`https://api.github.com/users/${githubHandle}`)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      return {
        url: json.avatar_url,
        twitter: json.twitter_username,
        followers: json.followers
      };
    });

    return `
      <img src="${ github.url }" />
      <p>Hi, my GitHub handle is <a href="https://github.com/${ githubHandle }" target="_blank">${ githubHandle }</a>.</p>
      <p>My Twitter handle is ${ github.twitter } and I have ${ github.followers } followers.</p>
    `;
};
