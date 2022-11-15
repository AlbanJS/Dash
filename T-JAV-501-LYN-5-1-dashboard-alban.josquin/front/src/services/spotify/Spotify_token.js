async function SpotifyToken() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/spotify/token", requestOptions).catch((error => {return error}))
    if (response.status === 204) {
        return response.status
    }
    const result = await response.text()
    return result
}

export default SpotifyToken;