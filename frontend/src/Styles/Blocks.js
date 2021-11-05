import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {makeStyles, withStyles} from "@mui/styles";
import {TabScrollButton} from "@mui/material";


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
  },
  verticalDivider: {
    alignSelf: 'stretch',
    height: 'auto'
  },
  horizontalList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
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
    overflow: "hidden",
    maxHeight: window.innerHeight / 1.3,
    height: window.innerHeight / 1.3,
    "&:hover": {
      overflowY: "overlay",
    }
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
  },
  sideBarFiltersContainer: {
    overflow: "hidden",
    "&:hover": {
      overflowY: "overlay",
    }
  }
}));

export const tabsStyles = {minHeight: 28, height: 28};
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
    maxHeight: 200,
    overflow: "hidden",
    "&:hover": {
      overflowY: "overlay",
    }
  },
  toolbarContainer: {
    padding: 10,
    height: 55
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
  },
  gridContainer: {
    padding: 10,
  }
}

export const AccountNavbarMenuProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

export const CustomRequestsTabScrollButton = withStyles(theme => ({
  root: {
    width: 28,
    overflow: 'hidden',
    transition: 'width 0.5s',
    '&.Mui-disabled': {
      width: 0,
    },
  },
}))(TabScrollButton);
