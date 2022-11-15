async function LoginFetch(login_form) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": login_form.email,
        "password": login_form.password,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/login", requestOptions).catch((error => {return error}))
    const result = await response.text()
    return result
}

export default LoginFetch