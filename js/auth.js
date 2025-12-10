const clientId = "0af19046848d4406a95c670c0257af84";
const redirectUri = "https://finalwwd330.netlify.app/callback.html";
const scopes = ["user-read-private", "user-top-read"];

function generateRandomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

document.getElementById("login-btn").addEventListener("click", async () => {
  const codeVerifier = generateRandomString(64);
  localStorage.setItem("code_verifier", codeVerifier);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64urlencode(hashed);

  const authUrl =
    "https://accounts.spotify.com/authorize" +
    `?client_id=${clientId}` +
    "&response_type=code" +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&code_challenge=${codeChallenge}` +
    "&code_challenge_method=S256" +
    `&scope=${encodeURIComponent(scopes.join(" "))}`;

  window.location.href = authUrl;
});
