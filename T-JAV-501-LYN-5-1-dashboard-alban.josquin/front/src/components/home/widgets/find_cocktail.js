import { useContext, useState } from "react"
import { Box, List, ListItem, ListItemText, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FindCocktailFetch from "../../../services/findCocktail/find_cocktail";
import WidgetDelete from "../../../services/widgetAdd/Widget_delete";
import TokenDecoder from "../../../services/token/token_decode";
import WidgetUpdateFetch from "../../../services/widgetAdd/Widget_updateFetch";
import { WidgetContext } from "../../../pages/Home";


export default function FindCocktail(props) {
    const [ingredient, setIngredient] = useState("")
    const [drinks, setDrinks] = useState([])

    const widgetContext = useContext(WidgetContext)

    const handleSearch = async () => {
        const result = await FindCocktailFetch(ingredient)
        setDrinks(result.drinks)
    };

    const deleteWidget = async (id, widgetList) => {
        const newList = WidgetDelete (id, widgetList)
        const tokenId = TokenDecoder()
        const updatedUser = await WidgetUpdateFetch(tokenId.sub, newList)
        widgetContext.widgetDispatch({type: "updateWidget", updateWidget: updatedUser})
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: 450, m: 5 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        Find cocktail
                        <Button onClick={() => deleteWidget(props.widgetId, widgetContext.widgetState)} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Box>
                </Typography>
                <Typography variant="h5" component="div">
                    find Cocktail by alcool name
                </Typography>
                <div style={{ display: "flex" }}>
                    <TextField
                        sx={{ mt: 2, mb: 2, mr: 1 }}
                        id="filled-search"
                        label="Enter Alcool"
                        type="search"
                        variant="filled"
                        onInput={e => setIngredient(e.target.value)}
                    />

                </div>
                <div>
                    <List>
                    {drinks.map((drink, index) => (
                        <ListItem key={drink.idDrink}>
                            <ListItemText primary={drink.idDrink} />
                        </ListItem>
                    ))}
                    </List>
                </div>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small" onClick={handleSearch}>Get results</Button>
            </CardActions>
        </Card>

    );
}