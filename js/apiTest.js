async function testSpotifyToken() {
  const token = localStorage.getItem("spotify_access_token");

  if (!token) {
    console.log("No token found.");
    return;
  }

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();
  console.log("TEST RESULT:", data);
}

testSpotifyToken();
