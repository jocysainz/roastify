const roastCardSection = document.getElementById("roast-card-section");
const roastCard = document.getElementById("roast-card");
const roastArtists = document.getElementById("roast-artists");
const roastTracks = document.getElementById("roast-tracks");
const downloadBtn = document.getElementById("download-roast");

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateArtistRoast(artist) {
    const roasts = [
        `Oh wow, ${artist.name}? Really? Interesting choice...`,
        `Looks like ${artist.name} is your vibe. Bold move!`,
        `Seriously? ${artist.name} at the top? No judgment… kinda.`,
        `${artist.name} is your top artist. Are you trying to be extra?`
    ];
    return getRandomItem(roasts);
}

function generateTrackRoast(track) {
    const roasts = [
        `Listening to "${track.name}" by ${track.artists.join(", ")}? Classic.`,
        `"${track.name}" is your jam? Nice.`,
        `Ah, "${track.name}"... your secret guilty pleasure.`,
        `${track.artists.join(", ")} strikes again with "${track.name}".`
    ];
    return getRandomItem(roasts);
}

function generateRoastCard(data) {
    roastArtists.innerHTML = "";
    roastTracks.innerHTML = "";

    data.artists.forEach(artist => {
        const p = document.createElement("p");
        p.textContent = generateArtistRoast(artist);
        roastArtists.appendChild(p);
    });

    data.trackData.forEach(track => {
        const p = document.createElement("p");
        p.textContent = generateTrackRoast(track);
        roastTracks.appendChild(p);
    });

    roastCardSection.classList.remove("hidden");
    roastCard.classList.add("fade-in");
}

downloadBtn.addEventListener("click", async () => {
    try {
        const canvas = await html2canvas(roastCard);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "my_roast.png";
        link.click();
    } catch (err) {
        alert("Failed to capture roast card: " + err.message);
    }
});
