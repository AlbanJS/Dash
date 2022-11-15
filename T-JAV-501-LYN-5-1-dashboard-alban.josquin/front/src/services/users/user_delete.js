async function DeleteUser(id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/user/" + id, requestOptions).catch((error => {return error}))
    const result = await response.text()
    return result
}

export default DeleteUser