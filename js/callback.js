const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
const codeVerifier = localStorage.getItem("code_verifier");

if (!code) {
  alert("No authorization code found.");
  throw new Error("Missing code");
}

async function getAccessToken() {
  const response = await fetch("/.netlify/functions/exchange_token", {
    method: "POST",
    body: JSON.stringify({ code, code_verifier: codeVerifier }),
  });

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem("spotify_access_token", data.access_token);
    window.location.href = "dashboard.html";
  } else {
    console.error(data);
    alert("Failed to get access token");
  }
}

getAccessToken();
