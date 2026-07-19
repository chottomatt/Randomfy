async function searchGenre() {
    const answer = await fetch("https://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=8d5e391006041eb0d8c1bda2b7631161&format=json");
    const dados = await answer.json();
    console.log(dados);
}

searchGenreGenre()