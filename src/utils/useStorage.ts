export const useStorage = (action: string, token?: string): string | undefined => {
  if (action === "set" && token) {
    sessionStorage.setItem(`githubGraphQL`, token);
  }
  const tokenKey: string | undefined = Object.keys(sessionStorage).find((item) => item.startsWith("githubGraphQL"));
  if (tokenKey && action === "get") {
    return sessionStorage[tokenKey];
  }
  if (tokenKey && action === "remove") {
    sessionStorage.removeItem(tokenKey);
  }
};