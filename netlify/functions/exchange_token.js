export async function handler(event) {
  try {
    const { code, code_verifier } = JSON.parse(event.body);

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: "0af19046848d4406a95c670c0257af84",
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "https://finalwwd330.netlify.app/callback.html",
        code_verifier: code_verifier,
      }),
    });

    const data = await res.json();

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
