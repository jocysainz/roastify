const token = localStorage.getItem("spotify_access_token");

if (!token) {
  window.location.href = "index.html";
}

async function fetchSpotify(endpoint) {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

async function loadDashboard() {
  document.getElementById("loading").classList.remove("hidden");

  //fetch user profile
  const user = await fetchSpotify("me");

  document.getElementById("user-img").src = user.images?.[0]?.url || "";
  document.getElementById("user-name").innerText = user.display_name;

  document.getElementById("user-info").classList.remove("hidden");

  //fetch top artists
  const artists = await fetchSpotify("me/top/artists?limit=5");
  const artistList = document.getElementById("artists-list");

  artists.items.forEach(a => {
    const li = document.createElement("li");
    li.innerText = a.name;
    artistList.appendChild(li);
  });

  document.getElementById("top-artists").classList.remove("hidden");

  const tracks = await fetchSpotify("me/top/tracks?limit=5");
  const trackList = document.getElementById("tracks-list");

  tracks.items.forEach(t => {
    const li = document.createElement("li");
    li.innerText = `${t.name} — ${t.artists[0].name}`;
    trackList.appendChild(li);
  });

  document.getElementById("top-tracks").classList.remove("hidden");

  document.getElementById("generate-roast").classList.remove("hidden");

  document.getElementById("loading").classList.add("hidden");
}

loadDashboard();
