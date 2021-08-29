import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Typography,
  Toolbar,
  ListItemText,
  ListItemIcon,
  Drawer,
  Divider,
  CssBaseline,
  AppBar,
  Hidden,
  IconButton,
  MenuList,
  MenuItem,
  Grid,
  Tooltip
} from "@material-ui/core";
import { withStyles, useTheme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import routs from "../../router/routs";
import SystemLogo from "../../components/logo/SystemLogo";
import LayoutStyle from "./LayoutStyle";
import { Link, withRouter } from "react-router-dom";

function Layout(props) {
  const {
    container,
    classes,
    onLogout,
    currentUser,
    location: { pathname }
  } = props;

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <MenuList>
        {routs.map(rout => {
          const isActiveRout = pathname.includes(rout.path);
          if (rout.hidden) return [];
          return (
            <MenuItem
              selected={isActiveRout}
              classes={{
                selected: classes.menuItemSelected
              }}
              button
              key={rout.id}
              component={Link}
              to={rout.path}
            >
              <ListItemIcon>
                <rout.icon
                  className={isActiveRout ? classes.listItemIcon : null}
                />
              </ListItemIcon>
              <ListItemText primary={rout.name} />
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item>
            <Toolbar>
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
                Welcome {currentUser && currentUser.toUpperCase()}
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item>
            <Tooltip title="Logout">
              <IconButton
                onClick={onLogout}
                color="inherit"
                edge="start"
                style={{
                  height: "100%"
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <SystemLogo />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default withStyles(LayoutStyle)(withRouter(Layout));
