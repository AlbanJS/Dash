import { useContext, useState } from "react"
import { Box, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FindTranslateFetch from "../../../services/findTranslate/find_translate";
import WidgetDelete from "../../../services/widgetAdd/Widget_delete";
import TokenDecoder from "../../../services/token/token_decode";
import WidgetUpdateFetch from "../../../services/widgetAdd/Widget_updateFetch";
import { WidgetContext } from "../../../pages/Home";


export default function FindTranslate(props) {
    const [string, setString] = useState("")
    const [translate, setTranslate] = useState("")
    

    const widgetContext = useContext(WidgetContext)

    const handleSearch = async () => {
        const result = await FindTranslateFetch(string)
        setTranslate(result.translate)
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
                        Translate
                        <Button onClick={() => deleteWidget(props.widgetId, widgetContext.widgetState)} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Box>
                </Typography>
                <Typography variant="h5" component="div">
                    Enter String to translate (English)
                </Typography>
                <div style={{ display: "flex" }}>
                    <TextField
                        sx={{ mt: 2, mb: 2, mr: 1 }}
                        id="filled-search"
                        label="translate"
                        type="search"
                        variant="filled"
                        onInput={e => setString(e.target.value)}
                    />

                </div>
                <Typography variant="body2">
                    { translate !== "" && "translate:" + translate }
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small" onClick={handleSearch}>Get results</Button>
            </CardActions>
        </Card>
    );
}