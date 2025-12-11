function generateRoastCard(data) {
    const roastCard = document.getElementById("roast-card");
    const artistsDiv = document.getElementById("roast-artists");
    const tracksDiv = document.getElementById("roast-tracks");

    artistsDiv.innerHTML = "<h3>Top Artists & Tags</h3>";
    data.artists.forEach(artist => {
        const p = document.createElement("p");
        p.textContent = `${artist.name} — Tags: ${artist.tags.join(", ")}`;
        artistsDiv.appendChild(p);
    });

    tracksDiv.innerHTML = "<h3>Top Tracks</h3>";
    data.trackData.forEach(track => {
        const p = document.createElement("p");
        p.textContent = `${track.name} — ${track.artists.join(", ")}`;
        tracksDiv.appendChild(p);
    });

    roastCard.classList.add("fade-in");
    document.getElementById("roast-card-section").classList.remove("hidden");
}

const downloadBtn = document.getElementById("download-roast");
downloadBtn.addEventListener("click", () => {
    const roastCard = document.getElementById("roast-card");
    html2canvas(roastCard).then(canvas => {
        const link = document.createElement("a");
        link.download = "my-music-roast.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});
