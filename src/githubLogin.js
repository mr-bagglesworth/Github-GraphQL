const base64 = require("base-64");

// these need to be replaced with my credentials (I think...)
const config = {
  GITHUB_CLIENT_ID: "e0b1671ff764de482212",
  GITHUB_CLIENT_SECRET: "8f77dcfd6a807cff38ac558400c859f240806071"
};

// - my personal app details are as follows:
// - called GraphQL Test - an oAuth application
// Client ID
// f45c78716cd39cafc47f
// Client Secret
// 370d55cc54d7c88b91633565f2394495365d5802
// const config = {
//   GITHUB_CLIENT_ID: "f45c78716cd39cafc47f",
//   GITHUB_CLIENT_SECRET: "370d55cc54d7c88b91633565f2394495365d5802"
// };

const AUTH_URL_PATH = "https://api.github.com/authorizations";

export function login(name, pwd) {
  const bytes = name.trim() + ":" + pwd.trim();
  const encoded = base64.encode(bytes);

  return fetch(AUTH_URL_PATH, {
    method: "POST",
    headers: {
      Authorization: "Basic " + encoded,
      "User-Agent": "GitHub Issue Browser",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/vnd.github.inertia-preview+json"
    },
    body: JSON.stringify({
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      scopes: ["user", "repo"],
      note: "not abuse"
    })
  }).then(response =>
    response.json().then(json => {
      if (response.status < 400) {
        return json.token;
      } else {
        throw new Error(json.message);
      }
    })
  );
}
