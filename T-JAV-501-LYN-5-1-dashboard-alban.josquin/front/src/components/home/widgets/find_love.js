import { useContext, useState } from "react"
import { Box, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FindLoveFetch from "../../../services/findLove/find_love";
import WidgetDelete from "../../../services/widgetAdd/Widget_delete";
import TokenDecoder from "../../../services/token/token_decode";
import WidgetUpdateFetch from "../../../services/widgetAdd/Widget_updateFetch";
import { WidgetContext } from "../../../pages/Home";

export default function FindLove(props) {
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [percentage, setPercentage] = useState("")
    const [phrase, setPhrase] = useState("")

    const widgetContext = useContext(WidgetContext)

    const handleSearch = async () => {
        const result = await FindLoveFetch(firstName, secondName)
        setPercentage(result.percentage)
        setPhrase(result.result)
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
                        Find love
                        <Button onClick={() => deleteWidget(props.widgetId, widgetContext.widgetState)} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Box>
                </Typography>
                <Typography variant="h5" component="div">
                    Is love in the air?
                </Typography>
                <div style={{ display: "flex" }}>
                    <TextField
                        sx={{ mt: 2, mb: 2, mr: 1 }}
                        id="filled-search"
                        label="Enter the first name"
                        type="search"
                        variant="filled"
                        onInput={e => setFirstName(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2, mb: 2, mr: 1 }}
                        id="filled-search"
                        label="Enter the second name"
                        type="search"
                        variant="filled"
                        onInput={e => setSecondName(e.target.value)}
                    />
                </div>
                <Typography variant="body2">
                    {percentage !== "" && percentage + "% : " + phrase}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small" onClick={handleSearch}>Get results</Button>
            </CardActions>
        </Card>
    );
}