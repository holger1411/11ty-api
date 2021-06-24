const fetch = require("node-fetch");

module.exports = async function() {
  console.log("Fetching GitHub data...");

  return fetch("https://api.github.com/users/holger1411")
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      return {
        url: json.avatar_url,
        twitter: json.twitter_username,
        followers: json.followers
      };
    });
};
