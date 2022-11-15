function WidgetAdd(type, list) {
    const idRandom = Date.now().toString()
    const spotifyTopTrack = "top_track"
    const FindLove = "find_love"
    const FindCocktail = "find_cocktail"
    const FindCard = "find_card"


    if (type === spotifyTopTrack) {
        const newWidget = {id: idRandom, type: spotifyTopTrack, params: null}
        list.push(newWidget)
        return list
    }

    if (type === FindLove) {
        const newWidget = {id: idRandom, type: FindLove, params: null}
        list.push(newWidget)
        return list
    }

    if (type === FindCocktail) {
        const newWidget = {id: idRandom, type: FindCocktail, params: null}
        list.push(newWidget)
        return list
    }
    if (type === FindCard) {
        const newWidget = {id: idRandom, type: FindCard, params: null}
        list.push(newWidget)
        return list
    }

}

export default WidgetAdd