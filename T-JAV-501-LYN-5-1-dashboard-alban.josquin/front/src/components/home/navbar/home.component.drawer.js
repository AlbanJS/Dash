import { useState, Fragment, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuWidget from './home.component.menu';
import SpotifyToken from '../../../services/spotify/Spotify_token';
import SpotifyFetch from '../../../services/spotify/Spotify_fetch';
import { WidgetContext } from '../../../pages/Home';
import WidgetAdd from '../../../services/widgetAdd/Widget_add';
import WidgetUpdateFetch from '../../../services/widgetAdd/Widget_updateFetch';
import TokenDecoder from '../../../services/token/token_decode';

export default function DrawerWidget() {

    const [tokenPresent, setTokenPresent] = useState(false)
    const [state, setState] = useState({
        left: false,
    });
    const widgetContext = useContext(WidgetContext)

    const handleSpotify = async () => {
        const redirect = await SpotifyFetch()
        window.open(redirect, '_blank').focus();
    };

    const addWidget = async (widgetType, widgetList) => {
        console.log(widgetList);
        console.log(widgetType);
        const newList = WidgetAdd (widgetType, widgetList)
        const tokenId = TokenDecoder()
        const updatedUser = await WidgetUpdateFetch(tokenId.sub, newList)
        widgetContext.widgetDispatch({type: "updateWidget", updateWidget: updatedUser})
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        request()
    }, [])

    async function request() {
        if (localStorage.getItem("spotify_token") !== null) {
            setTokenPresent(true);
        } else {
            const spotifyToken = await SpotifyToken()
            if (spotifyToken === 204) {
                return false
            }
            setTokenPresent(true)
            localStorage.setItem("spotify_token", spotifyToken)
        }
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Spotify services'].map((text, index) => (
                    <ListItem key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <ListItem >
                    { !tokenPresent &&<ListItemButton>
                        <ListItemText primary="Connexion" onClick={handleSpotify}/>
                    </ListItemButton>}
                    { tokenPresent &&<ListItemButton onClick={() => addWidget("top_track", widgetContext.widgetState)}>
                        <ListItemText primary="Top track" />
                    </ListItemButton>}
                </ListItem>
            </List>
            <Divider />
            <List>
                {['Ajouter un widget'].map((text, index) => (
                    <ListItem key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Find love'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => addWidget("find_love", widgetContext.widgetState)}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List>
                {['Find cocktail'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => addWidget("find_cocktail", widgetContext.widgetState)}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List>
                {['Find card'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => addWidget("find_card", widgetContext.widgetState)}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <Fragment key={anchor}>
                    <div onClick={toggleDrawer(anchor, true)}><MenuWidget /></div>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </Fragment>
            ))}
        </div>
    );
}