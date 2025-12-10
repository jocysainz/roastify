const loadingEl = document.getElementById("loading");
const userInfoEl = document.getElementById("user-info");
const userImgEl = document.getElementById("user-img");
const userNameEl = document.getElementById("user-name");
const topArtistsEl = document.getElementById("top-artists");
const artistsListEl = document.getElementById("artists-list");
const topTracksEl = document.getElementById("top-tracks");
const tracksListEl = document.getElementById("tracks-list");
const generateRoastBtn = document.getElementById("generate-roast");
const logoutBtn = document.getElementById("logout-btn");

const accessToken = localStorage.getItem("spotify_access_token");
if (!accessToken) {
    alert("Spotify token missing. Please login again.");
    window.location.href = "index.html";
}

async function spotifyFetch(endpoint) {
    const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
    return await res.json();
}

const LASTFM_API_KEY = "d19b50f52548553de33269b13d88ed98";
async function fetchLastFmTags(artistName) {
    const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(
            artistName
        )}&api_key=${LASTFM_API_KEY}&format=json`
    );
    const data = await res.json();
    if (data.toptags && data.toptags.tag) {
        return data.toptags.tag.slice(0, 3).map(tag => tag.name);
    }
    return [];
}

async function getUserProfile() {
    const profile = await spotifyFetch("me");
    userImgEl.src = profile.images[0]?.url || "";
    userNameEl.textContent = profile.display_name;
    userInfoEl.classList.remove("hidden");
}

async function getTopArtists() {
    const data = await spotifyFetch("me/top/artists?limit=5&time_range=short_term");
    artistsListEl.innerHTML = "";
    const artistData = [];
    for (const artist of data.items) {
        const li = document.createElement("li");
        li.textContent = artist.name;
        artistsListEl.appendChild(li);

        const tags = await fetchLastFmTags(artist.name);
        artistData.push({ name: artist.name, tags });
    }
    topArtistsEl.classList.remove("hidden");
    return artistData;
}

async function getTopTracks() {
    const data = await spotifyFetch("me/top/tracks?limit=5&time_range=short_term");
    tracksListEl.innerHTML = "";
    const trackIds = [];
    const trackData = [];
    for (const track of data.items) {
        const li = document.createElement("li");
        li.textContent = `${track.name} — ${track.artists.map(a => a.name).join(", ")}`;
        tracksListEl.appendChild(li);

        trackIds.push(track.id);
        trackData.push({ name: track.name, artists: track.artists.map(a => a.name) });
    }
    topTracksEl.classList.remove("hidden");
    return { trackIds, trackData };
}

async function getAudioFeatures(trackIds) {
    if (trackIds.length === 0) return [];
    const data = await spotifyFetch(`audio-features?ids=${trackIds.join(",")}`);
    return data.audio_features;
}

async function loadDashboard() {
    try {
        const profilePromise = getUserProfile();
        const artistsPromise = getTopArtists();
        const tracksPromise = getTopTracks();

        const [_, artists, { trackIds, trackData }] = await Promise.all([
            profilePromise,
            artistsPromise,
            tracksPromise
        ]);

        const audioFeatures = await getAudioFeatures(trackIds);

        console.log("Top Artists with Tags:", artists);
        console.log("Top Tracks:", trackData);
        console.log("Audio Features:", audioFeatures);

        generateRoastBtn.classList.remove("hidden");

        window.roastData = { artists, trackData, audioFeatures };
    } catch (err) {
        alert("Error fetching Spotify data: " + err.message);
        console.error(err);
    } finally {
        loadingEl.classList.add("hidden");
    }
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("spotify_access_token");
    window.location.href = "index.html";
});

generateRoastBtn.addEventListener("click", () => {
    const data = window.roastData;
    if (!data) {
        alert("Data not ready yet!");
        return;
    }
    console.log("Generating roast with data:", data);
    alert("Roast generation coming soon!");
});

loadDashboard();
