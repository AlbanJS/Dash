async function UpdateUser(id, body) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "firstname": body.firstname,
        "lastname": body.lastname,
        "email": body.email
    })

    const requestOptions = {
        method: 'PUT',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };

    console.log(raw);

    const response = await fetch("http://localhost:8080/user/" + id, requestOptions).catch((error => {return error}))
    const result = await response.json()
    return result
}

export default UpdateUser