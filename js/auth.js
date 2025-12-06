const clientId = ""; /*change this later*/
const redirectUri = "http://localhost:5500/callback.html";/*change this later too, working on netlify*/

const scopes = [
  "user-read-private",
  "user-top-read"
];

document.getElementById("login-btn").addEventListener("click", () => {
  const authUrl =
    `https://accounts.spotify.com/authorize?client_id=${clientId}` +
    `&response_type=token` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scopes.join(" "))}`;

  window.location.href = authUrl;
});
