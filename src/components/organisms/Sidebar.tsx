import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;

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
        marginLeft: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Sidebar({ language }: any) {
    // Hooks:
    const navigate = useNavigate(); // used for page navigation
    const theme = useTheme(); // the global theme
    const { pathname } = useLocation(); // used to get current page
    const [drawerIsOpen, setDrawerIsOpen] = useState(false) // used to manage the opening/closing of the drawer
    const appbarTitle = useRef(null) // reference to the appbar title (useRef prevents re-render infinite loop)

    // Constants and variables:
    // Colors:
    const backgroundColor = theme.palette.mode === "dark"? "#121212" : "white" // choose sidebar background color depending on theme
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

    // const getAppbarTitle = ()


    // Functions:
    // Used to highlight sidebar tab that corresponds to the current view:
    function shouldSelect(currentSidebarTab: any) {
        let tabUrl = '/' + currentSidebarTab.navigateTo; // add slash at the beginning of 'tabUrl'

        if (tabUrl === pathname /* where 'pathname' is the current browser url */){
            appbarTitle.current = currentSidebarTab.drawerLabel // set appbar title to the selected tab label
            return true
        }
        return false
    }

    // Logs user out:
    function logOut() {
        localStorage.removeItem("khoble-session") // remove user jwt from browser
        navigate("/login") // redirect to login page
    }

    // Toggles drawer between close and open states:
    const toggleDrawer =
        (isOpen: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setDrawerIsOpen(isOpen);
            };

    // The tab list inside the drawer:
    const drawerContent = (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {sidebarConfig.map((drawerTab, index) => (
                    <ListItem
                        key={`drawer-tab-${index}`}
                        disablePadding
                        aria-label={`${drawerTab.drawerLabel} drawer tab`}
                        onClick={() => { navigate("/" + drawerTab.navigateTo) }}
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: drawerIsOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            selected={shouldSelect(drawerTab)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: drawerIsOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {<drawerTab.icon />}
                            </ListItemIcon>
                            <ListItemText
                                primary={drawerTab.drawerLabel}
                                sx={{ opacity: drawerIsOpen ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={logOut}
                        sx={{
                            minHeight: 48,
                            justifyContent: drawerIsOpen ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: drawerIsOpen ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={drawerIsOpen}
                sx={{backgroundColor: backgroundColor}}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        edge="start"
                        sx={{
                            marginRight: 1,
                            ...(drawerIsOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon 
                            {...(theme.palette.mode === "light" && {sx: {color: "rgba(0,0,0,0.54)"}})}
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    // sx={{ flexGrow: 1 }}
                    >
                        {appbarTitle.current}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerIsOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: backgroundColor,
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={toggleDrawer(!drawerIsOpen)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {drawerContent}
            </Drawer>
            <DrawerHeader /> {/* necessary to display content under app bar */}
        </Box>
    );
}