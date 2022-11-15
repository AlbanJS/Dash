import { IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

function MenuWidget() {
    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default MenuWidget