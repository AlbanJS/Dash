import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import SpotifySearchArtist from '../../../services/spotify/Spotify_searchArtist';
import SpotifyTopTrackFetch from '../../../services/spotify/Spotify_topTrackFetch';
import { WidgetContext } from '../../../pages/Home';
import WidgetDelete from '../../../services/widgetAdd/Widget_delete';
import TokenDecoder from '../../../services/token/token_decode';
import WidgetUpdateFetch from '../../../services/widgetAdd/Widget_updateFetch';

export default function SpotifyTopTrack(props) {

    const [artist, setArtist] = React.useState("")
    const [listArtist, setListArtist] = React.useState([])
    const [track, setTrack] = React.useState([])
    const [displayResult, setDisplayResult] = React.useState(false)
    const widgetContext = React.useContext(WidgetContext)

    const stringTrack = "Track: "


    const handleSearch = async (artist) => {
        const list = await SpotifySearchArtist(artist)
        setListArtist(list)
        setDisplayResult(true)
    };

    const handleTracks = async (id) => {
        const track = await SpotifyTopTrackFetch(id)
        setTrack(track)
        setDisplayResult(false)
    };

    const deleteWidget = async (id, widgetList) => {
        const newList = WidgetDelete (id, widgetList)
        const tokenId = TokenDecoder()
        const updatedUser = await WidgetUpdateFetch(tokenId.sub, newList)
        widgetContext.widgetDispatch({type: "updateWidget", updateWidget: updatedUser})
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: 275, m: 5 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        Spotify
                        <Button onClick={() => deleteWidget(props.widgetId, widgetContext.widgetState)} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Box>
                </Typography>
                <Typography variant="h5" component="div">
                    Top track artist
                </Typography>
                <TextField
                    sx={{ mt: 2, mb: 2 }}
                    id="filled-search"
                    label="Enter the artist's name"
                    type="search"
                    variant="filled"
                    onInput={e => setArtist(e.target.value)}
                />
                {listArtist.map((value) =>
                    <Typography variant="body2" key={value.id}>
                        {displayResult && <Button onClick={() => handleTracks(value.id)}>{value.name}</Button>}
                    </Typography>
                )}
                <Typography variant="body2">
                    {track[0] !== undefined && stringTrack + track[0].name}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small" onClick={() => handleSearch(artist)}>Search</Button>
            </CardActions>
        </Card>
    );
}