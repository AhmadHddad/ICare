const drawerWidth = 240;
const LayoutStyle = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  menuItemSelected: {
    backgroundColor: theme.palette.primary.light + " !important",
    boxShadow: "0px 0px 20px -9px rgba(0,0,0,0.75) !important",
    color: "white"
  },
  listItemIcon: {
    color: "white"
  }
});

export default LayoutStyle;
