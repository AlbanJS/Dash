async function SpotifyFetch() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/spotify", requestOptions).catch((error => {return error}))
    const result = await response.text()
    return result
}

export default SpotifyFetch