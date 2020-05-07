import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { MdDashboard, MdSettings } from 'react-icons/md'
import { MdMessage} from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import  bg  from './bg.jpeg';
import bg2 from './Forest.jpg'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
       backgroundColor:"#333",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
       
    },
    drawerOpen: {
        width: drawerWidth,
        backgroundImage: `url(${bg2})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        backgroundImage: `url(${bg2})`  ,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Header = ({onWidthChange}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        onWidthChange(240);
        setOpen(true);
    };

    const handleDrawerClose = () => {
        onWidthChange(50);
        setOpen(false);
    };
    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                       Welcome Admin
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:"white"}} /> : <ChevronLeftIcon style={{color:"white"}}/>}
                    </IconButton>
                </div>
                <Divider />
                <List style={{color:"white" }} >
                   <ListItem > <ListItemIcon> <MdDashboard /></ListItemIcon> <ListItemText>Dashboard</ListItemText> </ListItem>
                   <ListItem > <ListItemIcon> <FaUserAlt /></ListItemIcon><ListItemText>Users</ListItemText></ListItem>
                   <ListItem > <ListItemIcon> <MdMessage /></ListItemIcon><ListItemText>Messages</ListItemText></ListItem>
                </List>
                <Divider />
                <List style={{color:"white" }}>
                <ListItem> <ListItemIcon> <MdSettings /></ListItemIcon> Settings</ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default Header;