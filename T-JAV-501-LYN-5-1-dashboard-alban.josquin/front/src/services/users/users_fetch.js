async function UsersFetch() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/user", requestOptions).catch((error => {return error}))
    const result = await response.json()
    return result
}

export default UsersFetch