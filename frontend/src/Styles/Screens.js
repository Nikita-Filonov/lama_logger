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
  membersTableContainer: {
    height: window.innerHeight / 1.4,
    maxHeight: window.innerHeight / 1.4
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
