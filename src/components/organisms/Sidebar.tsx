import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar({ language, renderedContent }: any) {
    // Hooks:
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Constants and variables:

    // Toggles drawer between close and open states:
    const toggleDrawer = () => {
        setOpen(!open)
    };

    // Used to store and render the sidebar tabs:
    var listItemArray: JSX.Element[] = [];

    const sidebarConfig = [
        {
            icon: DataUsageIcon,
            drawerLabel:
                language === "english" ?
                    "General" :
                    language === "español" ?
                        "Generales" :
                        "",
            navigateTo: "general"
        },
        {
            icon: BusinessIcon,
            drawerLabel:
                language === "english" ?
                    "Companies" :
                    language === "español" ?
                        "Compañías" :
                        "",
            navigateTo: "companies"
        },
        {
            icon: SchoolIcon,
            drawerLabel:
                language === "english" ?
                    "Students" :
                    language === "español" ?
                        "Estudiantes" :
                        "",
            navigateTo: "students"
        }
    ]; // Contains the configuration of the sidebar


    // Functions:
    // Used to highlight sidebar tab that corresponds to the current view, and additionally sets the appbar label:
    function shouldSelect(currentSidebarTab: any) {
        var tabUrl = currentSidebarTab.navigateTo;

        // Add slash at the beginning of 'tabUrl'
        tabUrl = '/' + tabUrl;

        return tabUrl === pathname // where 'pathname' is the current browser url
    }

    // Logs user out:
    function logOut() {
        localStorage.removeItem('user') // remove user info from browser
        navigate("/login") // redirect to login page
    }

    // Returns the current tab's label and creates an array that contains the list items that correspond to the sidebar tabs:
    function getCurrentTabLabel() {
        var tabLabel = "";

        for (const [index, sidebarTab] of sidebarConfig.entries()) {
            // Check to see if current tab should be selected:
            let shouldSelectTab = shouldSelect(sidebarTab);

            // Create the ListItem (sidebar tab component):
            let currentListItem =
                <ListItem
                    key={index.toString()}
                    disablePadding
                    sx={{ display: 'block' }}
                    aria-label={sidebarTab.drawerLabel}
                    onClick={() => { navigate("/" + sidebarTab.navigateTo) }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5
                        }}
                        selected={shouldSelectTab}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {<sidebarTab.icon />}
                        </ListItemIcon>
                        <ListItemText primary={sidebarTab.drawerLabel} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

            // // Assign the tab label based on language:
            if (shouldSelectTab) tabLabel =
                // language === "english" ? 
                //     sidebarTab.drawerLabel + " KPIs" :
                // language === "español" ? 
                //     "KPIs " + sidebarTab.drawerLabel.toLowerCase() :
                // ""
                tabLabel = sidebarTab.drawerLabel

            // Store the list item:
            listItemArray.push(currentListItem);
        }

        return tabLabel;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1}}
                    >
                        {getCurrentTabLabel()}
                    </Typography>
                    <IconButton onClick={logOut}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {listItemArray}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {renderedContent}
            </Box>
        </Box>
    );
}