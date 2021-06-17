import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import user from "../../../images/others/form-bg.png";
import { useState } from "react";
import CurrentAdminPage from "../CurrentAdminPage/CurrentAdminPage";
import { useHistory } from "react-router-dom";
import AdminIcons from "../AdminIcons/AdminIcons";
import HomeIcon from "@material-ui/icons/Home";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
      display: "block",
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

function Admin(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageTitle, setCurrentPageTitle] = useState("Manage Products");
  let history = useHistory();
  const features = [
    "Manage Products",
    "Manage Users",
    "Manage Ads",
    "Manage Offers",
    "Orders",
    "Add Product",
    "Add Admin",
    "Reports",
    "Statistics",
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageChange = (e, index) => {
    setCurrentPage(index);
    setCurrentPageTitle(features[index]);
  };

  const goToHomePage = () => {
    history.push("/home");
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <h1 className="text-center text-red-400 font-bold text-lg sm:hidden">
        E-shop
      </h1>
      <Divider />
      <List>
        {features.map((text, index) => (
          <ListItem
            onClick={(e) => handlePageChange(e, index)}
            button
            key={text}
          >
            <ListItemIcon>
              <AdminIcons index={index} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem onClick={goToHomePage} button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={"Home"} />
      </ListItem>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="flex items-center justify-between">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              E-Shop
            </Typography>
          </div>
          <div className="h-10 w-10">
            <img
              className="w-full h-full border-4 rounded-full"
              src={user}
              alt="logo"
            />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <p>
          Admin/<span className="text-blue-400">{currentPageTitle}</span>
        </p>
        <CurrentAdminPage currentPage={currentPage} />
      </main>
    </div>
  );
}

export default Admin;
