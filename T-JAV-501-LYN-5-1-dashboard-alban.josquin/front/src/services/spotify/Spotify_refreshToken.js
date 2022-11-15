async function SpotifyRefresh() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/spotify/refresh", requestOptions).catch((error => {return error}))
    const result = await response.text()
    localStorage.setItem("spotify_token", result)
    return result
}

export default SpotifyRefresh