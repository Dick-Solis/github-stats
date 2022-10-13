// const BASE_URI="https://api.github.com/";

// export function getPokemon(query){
//   const safeQuery = query.replaceAll(' ', '-').toLowerCase();
//   return fetch(`${BASE_URI}/${safeQuery}`)
//   .then(res => res.json());
// }
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "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",
});

export default async function getUser(username) {
  const userData = await octokit.request("GET /users/{username}", {
    username: username,
  });
  return userData;
}

export async function getFollowers({ username, per_page = 100, page = 1 }) {
  return await octokit.request("GET /users/{username}/followers", {
    username,
    per_page,
    page,
  });
}

export async function getFollowing({ username, per_page = 100, page = 1 }) {
  return await octokit.request("GET /users/{username}/following", {
    username,
    per_page,
    page
  });
}

export async function getRepos(username) {
  return await octokit.request("GET /users/{username}/repos", {
    username,
    per_page: 100,
    page: 1,
  });
}

export async function getGists(username) {
  return await octokit.request("GET /users/{username}/gists", {
    username,
  });
}
