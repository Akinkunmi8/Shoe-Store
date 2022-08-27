import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Box, color } from "@mui/system";
import path from "path";
import { title } from "process";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";
interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
const midLinks = [
    {title: 'catalog', path:"/catalog"},
    {title: 'About', path:"/About"},
    {title: 'Contact', path:"/Contact"}
]
const navStyles= {
    color: 'inher',
    textDecoration: 'none', 
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

const rightLinks = [
    {title: 'login', path:"/login"},
    {title: 'register', path:"/register"},
]
export default function Header({darkMode, handleThemeChange}: Props){
    const {basket} = useAppSelector(state => state.basket);
    // to get item count
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
    return(
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* for nav bar */}
            <Box display= 'flex' alignItems= 'center'>
                <Typography variant='h6' component={NavLink} to='/'
                    sx={navStyles} >
                    SHOP-CART
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
            </Box>   
                {/* for the about and contact */}
                <List sx={{display: 'flex' }}>
                    {midLinks.map(({title, path}) =>(
                        <ListItem 
                           component={NavLink}
                           to={path}
                           key={path}
                           sx={navStyles} 
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                {/* for icon and signing */}
                <Box display= 'flex' alignItems= 'center'>
                    <IconButton component={Link} to='/basket' size="large" sx={{color: 'inherit'}}>
                        <Badge badgeContent={itemCount} color= 'secondary'>
                            <ShoppingCart/>
                        </Badge> 
                    </IconButton>
                    <List sx={{display: 'flex' }}>
                        {rightLinks.map(({title, path}) =>(
                            <ListItem 
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles} 
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}