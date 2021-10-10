import React from "react";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListItemText from "@mui/material/ListItemText";
import {BarChart, Dvr, FlashOn, Http, PeopleOutline, Settings} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {DrawerHeaderStyled, DrawerStyled} from "../../../../Styles/Blocks";
import {setRequest} from "../../../../Redux/Requests/requestsActions";

const RequestNavigationDrawer = ({open, onClose, project, setRequest}) => {
  const history = useHistory();
  const theme = useTheme();
  const baseRoute = `/projects/${project.id}`

  const onProjects = () => {
    history.push('/projects')
    setRequest({})
  }

  const onSettings = () => history.push(baseRoute + `/settings/general`)
  const onRequests = () => history.push(baseRoute)


  return (
    <DrawerStyled variant="permanent" open={open}>
      <DrawerHeaderStyled>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </IconButton>
      </DrawerHeaderStyled>
      <Divider/>
      <List>
        <ListItem button onClick={onProjects}>
          <ListItemIcon>
            <FormatListBulletedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Projects'}/>
        </ListItem>
        <ListItem button onClick={onRequests}>
          <ListItemIcon>
            <Http/>
          </ListItemIcon>
          <ListItemText primary={'Requests'}/>
        </ListItem>
        <ListItem button onClick={onProjects}>
          <ListItemIcon>
            <FlashOn/>
          </ListItemIcon>
          <ListItemText primary={'Performance'}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Dvr/>
          </ListItemIcon>
          <ListItemText primary={'Tracks'}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChart/>
          </ListItemIcon>
          <ListItemText primary={'Stats'}/>
        </ListItem>
        <ListItem button onClick={onSettings}>
          <ListItemIcon>
            <Settings/>
          </ListItemIcon>
          <ListItemText primary={'Settings'}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleOutline/>
          </ListItemIcon>
          <ListItemText primary={'Actions'}/>
        </ListItem>
      </List>
    </DrawerStyled>
  )
}

const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  {
    setRequest
  },
)(RequestNavigationDrawer);
