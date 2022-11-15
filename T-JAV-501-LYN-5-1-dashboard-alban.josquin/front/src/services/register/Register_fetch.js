async function RegisterFetch(register_form) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "firstname": register_form.first_name,
        "lastname": register_form.last_name,
        "email": register_form.email,
        "password": register_form.password,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/user", requestOptions).catch((error => {return error}))
    const result = await response.json()
    return result
}

export default RegisterFetch