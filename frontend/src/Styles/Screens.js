import {SIDEBAR_WIDTH} from "../Utils/Constants";
import {makeStyles} from "@mui/styles";


export const ProjectSettingsStyles = makeStyles((theme) => ({
  sidebarContainer: {
    bgcolor: 'background.paper',
    flexDirection: 'column',
    width: SIDEBAR_WIDTH,
    overflowX: 'hidden',
    position: 'fixed'
  },
  contentContainer: {
    marginLeft: 320,
    paddingTop: 0,
    marginTop: 10
  },
  sidebarListContainer: {
    maxHeight: window.innerHeight / 1.3,
    overflow: 'auto'
  },
  membersTableContainer: {
    height: window.innerHeight / 1.3,
    maxHeight: window.innerHeight / 1.3
  },
  headerContainer: {
    height: 60
  },
  sectionList: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': {padding: 0},
  }
}));


export const RequestsSendStyles = makeStyles({
  methodButton: {
    paddingLeft: 8,
    paddingRight: 56,
    position: "relative",

    "& .MuiButton-sizeSmall": {
      paddingLeft: 48,
      paddingRight: 32,
      position: "absolute",
      left: 16
    },
    "& .MuiButton-endIcon": {
      position: "absolute",
      right: 8
    }
  },
});
