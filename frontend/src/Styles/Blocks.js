import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {makeStyles} from "@material-ui/core";


export const common = {
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 80
  },
  spinner: {
    marginLeft: '50%',
    marginTop: '20%'
  },
  breakText: {
    wordWrap: 'break-word',
    whiteSpace: 'pre-line'
  }
}

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

export const DrawerHeaderStyled = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
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

export const DrawerStyled = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
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


export const RequestsTableStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: window.innerHeight / 1.3,
    height: window.innerHeight / 1.3,
  },
  rowRequestUrlText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
}));


const tabHeight = '28px' // default: '48px'
export const ViewRequestStyles = makeStyles(theme => ({
  tabsRoot: {
    minHeight: tabHeight,
    height: tabHeight,
  },
  tabRoot: {
    minHeight: tabHeight,
    height: tabHeight,
    minWidth: 50,
    fontSize: 12
  },
  headersContainer: {
    maxHeight: 200
  },
  toolbarContainer: {
    height: 50
  }
}), {index: 1});
