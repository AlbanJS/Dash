async function FindLoveFetch(firstName, secondName) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`http://localhost:8080/find-love?firstName=${firstName}&secondName=${secondName}`,
        requestOptions).catch((error => { return error }))
    const result = await response.json()
    return result
}

export default FindLoveFetch