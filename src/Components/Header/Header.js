import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router";
import "./Header.css";
import { Button } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AcUnitIcon from "@material-ui/icons/AcUnit";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "cornflowerBlue",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 100,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    marginRight: 200,
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (event) => {
    if (event.target.getAttribute("name") === "orders") {
      history.push("/orders");
    } else if (event.target.getAttribute("name") === "profile") {
      history.push("/profile");
    }
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToAdminPage = () => {
    history.push("/admin");
  };

  const goToHomePage = () => {
    history.push("/home");
  };

  const goToCartPage = () => {
    history.push("/cart");
  };

  const goToLoginPage = () => {
    history.push("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem name="orders" onClick={handleMenuClose}>
        My Orders
      </MenuItem>
      <MenuItem name="profile" onClick={handleMenuClose}>
        My Account
      </MenuItem>
    </Menu>
  );

  // const categoriesId = "primary-search-categories-menu";
  // const renderCategoriesMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={categoriesId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem name="all" onClick={handleMenuClose}>
  //       All
  //     </MenuItem>
  //     <MenuItem name="t-shirts" onClick={handleMenuClose}>
  //       T-shirts
  //     </MenuItem>
  //     <MenuItem name="jeans" onClick={handleMenuClose}>
  //       Jeans
  //     </MenuItem>
  //     <MenuItem name="electronics" onClick={handleMenuClose}>
  //       Electronics
  //     </MenuItem>
  //     <MenuItem name="fruits" onClick={handleMenuClose}>
  //       Fruits
  //     </MenuItem>
  //     <MenuItem name="groceries" onClick={handleMenuClose}>
  //       Groceries
  //     </MenuItem>
  //     <MenuItem name="bikes" onClick={handleMenuClose}>
  //       Bikes
  //     </MenuItem>
  //     <MenuItem name="cars" onClick={handleMenuClose}>
  //       Cars
  //     </MenuItem>
  //     <MenuItem name="mobiles" onClick={handleMenuClose}>
  //       Mobiles
  //     </MenuItem>
  //     <MenuItem name="laptops" onClick={handleMenuClose}>
  //       Laptops
  //     </MenuItem>
  //     <MenuItem name="watch" onClick={handleMenuClose}>
  //       Watch
  //     </MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={goToHomePage}>
        <IconButton aria-label="Show Home Page" color="inherit">
          <Badge color="secondary">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="products categories"
          aria-controls="primary-search-categories-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AcUnitIcon />
        </IconButton>
        <p>Categories</p>
      </MenuItem>
      <MenuItem onClick={goToLoginPage}>
        <IconButton aria-label="Show Admin Panel" color="inherit">
          <Badge color="secondary">
            <LockOpenIcon />
          </Badge>
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem onClick={goToCartPage}>
        <IconButton aria-label="Show Shopping Cart Of User" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={goToAdminPage}>
        <IconButton aria-label="Show Admin Panel" color="inherit">
          <Badge color="secondary">
            <SupervisorAccountIcon />
          </Badge>
        </IconButton>
        <p>Admin</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={{ backgroundColor: "rgb(33, 33, 49)" }} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            E-SHOP
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              onClick={goToLoginPage}
              style={{ color: "white" }}
              variant="outlined"
              color="primary"
            >
              Login
            </Button>
            <IconButton
              title="Go to Homepage"
              className="links"
              onClick={goToHomePage}
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="secondary">
                <HomeIcon />
              </Badge>
            </IconButton>
            <IconButton
              title="Watch Your Cart"
              className="links"
              onClick={goToCartPage}
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              title="Admin Panel"
              className="links"
              onClick={goToAdminPage}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="secondary">
                <SupervisorAccountIcon />
              </Badge>
            </IconButton>
            <IconButton
              title="Your Profile"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              className="links"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* {renderCategoriesMenu} */}
    </div>
  );
}
