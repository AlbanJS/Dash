async function WidgetUpdateFetch(id, widgets) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(widgets)

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log(raw);

    const response = await fetch("http://localhost:8080/user/user-widget/" + id, requestOptions).catch((error => {return error}))
    const result = await response.json()
    return result
}

export default WidgetUpdateFetch