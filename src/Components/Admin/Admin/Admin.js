import React, { useContext } from "react";
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
import { useState } from "react";
import CurrentAdminPage from "../CurrentAdminPage/CurrentAdminPage";
import { useHistory } from "react-router-dom";
import AdminIcons from "../AdminIcons/AdminIcons";
import HomeIcon from "@material-ui/icons/Home";
import { UserContext } from "../../../App";
import { useEffect } from "react";
import AccessAdmin from "../AccessAdmin/AccessAdmin";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageTitle, setCurrentPageTitle] = useState("Manage Products");
  const [isTemporaryAdmin, setIsTemporaryAdmin] = useState(false);
  const [user] = useContext(UserContext);
  let userNameFirstLetter;

  if (user.userName.length > 0) {
    userNameFirstLetter = user.userName.split("")[0].toUpperCase();
  }

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

  useEffect(() => {
    const updateCurrentPage = JSON.parse(localStorage.getItem("currentPage"));
    const updateCurrentPageTitle = JSON.parse(
      localStorage.getItem("currentPageTitle")
    );

    setCurrentPage(updateCurrentPage);
    setCurrentPageTitle(updateCurrentPageTitle);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
    localStorage.setItem("currentPageTitle", JSON.stringify(currentPageTitle));
  });

  const getStateData = (state) => {
    setIsTemporaryAdmin(state);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageChange = (e, index) => {
    setCurrentPage(index);
    setCurrentPageTitle(features[index]);
  };

  const goToHomePage = () => {
    history.push("/");
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <p className="text-center">
        Admin/<span className="text-blue-500">{currentPageTitle}</span>
      </p>
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

  if (isTemporaryAdmin) {
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
            <div className="flex items-center">
              <div className="h-10 w-10">
                <h1 className="font-bold flex items-center justify-center w-full h-full border-4 rounded-full bg-black text-xl">
                  {userNameFirstLetter}
                </h1>
              </div>
              <h2 className="ml-2">{user.userName}</h2>
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
              onClick={handleDrawerToggle}
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
          <CurrentAdminPage currentPage={currentPage} />
        </main>
      </div>
    );
  } else {
    return <AccessAdmin getStateData={getStateData} />;
  }
}

export default Admin;
