import { useContext, useState } from "react"
import { Box, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FindCardFetch from "../../../services/findCard/find_card";
import WidgetDelete from "../../../services/widgetAdd/Widget_delete";
import TokenDecoder from "../../../services/token/token_decode";
import WidgetUpdateFetch from "../../../services/widgetAdd/Widget_updateFetch";
import { WidgetContext } from "../../../pages/Home";

export default function FindCard(props) {
    const [name, setName] = useState("")
    const [type, setType] = useState("")


    const widgetContext = useContext(WidgetContext)

    const handleSearch = async () => {
        const result = await FindCardFetch(name)
        setType(result.type)
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
                        Find Hearstone card
                        <Button onClick={() => deleteWidget(props.widgetId, widgetContext.widgetState)} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Box>
                </Typography>
                <Typography variant="h5" component="div">
                    What card you looking for ?
                </Typography>
                <div style={{ display: "flex" }}>
                    <TextField
                        sx={{ mt: 2, mb: 2, mr: 1 }}
                        id="filled-search"
                        label="Enter the card name"
                        type="search"
                        variant="filled"
                        onInput={e => setName(e.target.value)}
                    />
                </div>
                <Typography variant="body2">
                    {type !== "" &&  "card text: " + type}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small" onClick={handleSearch}>Get results</Button>
            </CardActions>
        </Card>
    );
}