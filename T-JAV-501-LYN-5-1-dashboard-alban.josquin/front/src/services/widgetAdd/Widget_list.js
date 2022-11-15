import FindLove from "../../components/home/widgets/find_love"
import SpotifyTopTrack from "../../components/home/widgets/spotify_topTrack"
import FindCocktail from "../../components/home/widgets/find_cocktail"
import FindCard from "../../components/home/widgets/find_card"


function displayWidgets(list) {
    let output = []
    for (const value of list) {
        if (value.type === "top_track") {
            output.push(<SpotifyTopTrack key={value.id} widgetId={value.id}></SpotifyTopTrack>)
        
        } else if (value.type === "find_love") {
            output.push(<FindLove key={value.id} widgetId={value.id}></FindLove>)
        
        } else if (value.type === "find_cocktail") {
        output.push(<FindCocktail key={value.id} widgetId={value.id}></FindCocktail>)
       
        } else if (value.type === "find_card") {
        output.push(<FindCard key={value.id} widgetId={value.id}></FindCard>)
       
        } 
    }
    return (
        <>
            {output}
        </>
    )
}

export default displayWidgets