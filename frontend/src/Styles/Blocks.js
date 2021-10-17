import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {makeStyles} from "@mui/styles";


export const common = {
  fab: {
    position: 'fixed',
    bottom: 70,
    right: 30
  },
  spinner: {
    marginLeft: '50%',
    marginTop: '20%'
  },
  breakText: {
    wordWrap: 'break-word',
    whiteSpace: 'pre-line'
  },
  listContainer: {
    width: '100%',
    bgcolor: 'background.paper',
    overflow: 'auto',
    maxHeight: window.innerHeight / 1.3
  },
  ellipsisText: {
    textOverflow: 'ellipsis',
    whiteSpace: "nowrap",
    overflow: 'hidden'
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
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    right: 0
  }
}));


const tabHeight = '28px' // default: '48px'
export const ViewRequestStyles = makeStyles(theme => ({
  tabsRoot: {
    maxHeight: tabHeight,
    height: tabHeight,
  },
  tabRoot: {
    maxHeight: tabHeight,
    height: tabHeight,
    minWidth: 50,
    fontSize: 12
  },
  headersContainer: {
    maxHeight: 200
  },
  toolbarContainer: {
    padding: 10
  },
  toolbarButtonsDivider: {
    height: 40,
    marginLeft: 10,
    marginRight: 10
  }
}), {index: 1});

export const RequestsToolbarStyles = {
  buttonsDivider: {
    height: 40,
    marginLeft: 10,
    marginRight: 10
  },
  timeFiltersButton: {
    maxWidth: 200,
    width: 200,
    justifyContent: 'flex-start'
  }
}


export const StatsChartStyles = {
  lineChartMargin: {
    top: 20,
    right: 10,
    left: 0,
    bottom: 10
  }
}
