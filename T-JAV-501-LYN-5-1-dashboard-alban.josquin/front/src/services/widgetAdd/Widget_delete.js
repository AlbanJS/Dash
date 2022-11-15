function WidgetDelete(id, list) {
    const findById = (element) => element.id === id;
    const findIndex = list.findIndex(findById)
    console.log(findIndex);
    list.splice(findIndex, 1);
    return list
}

export default WidgetDelete