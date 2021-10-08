import {makeStyles} from "@material-ui/core";
import {SIDEBAR_WIDTH} from "../Utils/Constants";


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
  }
}));
