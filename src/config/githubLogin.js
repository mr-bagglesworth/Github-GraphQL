// import client id and secret from config file
import { clientId, clientSecret } from "../config/config";

const base64 = require("base-64");

// these need to be replaced with my credentials (I think...)
const config = {
  GITHUB_CLIENT_ID: clientId,
  GITHUB_CLIENT_SECRET: clientSecret
};

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
