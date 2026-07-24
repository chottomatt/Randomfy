async function searchGenre() {
    const answer = await fetch("https://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=8d5e391006041eb0d8c1bda2b7631161&format=json");
    const data = await answer.json();

    const nonGenres = [
        "female vocalists", "male vocalists", "seen live", "favorites",
        "favourite", "awesome", "beautiful", "love", "amazing",
        "german", "american", "british", "uk", "usa", "canadian",
        "70s", "80s", "90s", "00s", "singer-songwriter", "bookmark", 
        "japanese", "soundtrack", "chillout"
    ];

    const genres = data.tags.tag
        .map(function(tag) { 
        return tag.name;
    })
    .filter(function(genre) {
        return !nonGenres.includes(genre.toLowerCase());
    });

    const randomIndex = Math.floor(Math.random() * genres.length);
    const randomGenre = genres[randomIndex];
    
    const genreElement = document.getElementById("genre-result");
    genreElement.textContent = randomGenre;

    await searchSong(randomGenre);
    await searchAlbum(randomGenre);
}

async function searchSong(genre) {
    const answer = await fetch ("https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" 
        + genre + "&api_key=8d5e391006041eb0d8c1bda2b7631161&format=json")
    const data = await answer.json();

    const tracks = data.tracks.track;

    const randomIndex = Math.floor(Math.random() * tracks.length);
    const randomTrack = tracks[randomIndex];

    const songElement = document.getElementById("song-result");
    songElement.textContent = randomTrack.name + " - " + randomTrack.artist.name;
}

async function searchAlbum(genre) {
    const answer = await fetch ("https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=" 
        + genre + "&api_key=8d5e391006041eb0d8c1bda2b7631161&format=json")
    const data = await answer.json();

    const albums = data.albums.album;

    const randomIndex = Math.floor(Math.random() * albums.length);
    const randomAlbum = albums[randomIndex];

    const cover = randomAlbum.image.find(function(img) {
        return img.size === "extralarge";
    });

    const albumResultElement = document.getElementById("album-result");
    albumResultElement.textContent = randomAlbum.name + " - " + randomAlbum.artist.name;

    const albumCoverElement = document.getElementById("album-cover");
    albumCoverElement.src = cover["#text"];
}

searchGenre();