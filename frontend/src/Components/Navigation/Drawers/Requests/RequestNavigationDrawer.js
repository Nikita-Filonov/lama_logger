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
import {BarChart, Dvr, FlashOn, Http, LibraryBooks, PeopleOutline, Send, Settings} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useHistory, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {DrawerHeaderStyled, DrawerStyled} from "../../../../Styles/Blocks";
import {setRequest} from "../../../../Redux/Requests/Requests/requestsActions";
import DrawerSelectProject from "../../../Blocks/Common/Navigation/DrawerSelectProject";

const RequestNavigationDrawer = ({open, onClose, project, setRequest}) => {
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const baseRoute = `/projects/${project.id}`

  const onProjects = () => {
    history.push('/projects')
    setRequest({})
  }

  const onSettings = () => history.push(baseRoute + `/settings/general`)
  const onRequests = () => history.push(baseRoute + '/requests');
  const onStats = () => history.push(baseRoute + '/stats');
  const onTracks = () => history.push(baseRoute + '/tracks');
  const onUsersRequests = () => history.push(baseRoute + '/custom-requests');
  const onPerformance = () => history.push(baseRoute + `/performance`);

  return (
    <DrawerStyled variant="permanent" open={open}>
      <DrawerHeaderStyled>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </IconButton>
      </DrawerHeaderStyled>
      <Divider/>
      <List>
        <ListItem button onClick={onProjects} selected={location.pathname === '/projects'}>
          <ListItemIcon>
            <FormatListBulletedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Projects'}/>
        </ListItem>
        <ListItem button onClick={onRequests} selected={/\/projects\/[0-9]+\/requests/.test(location.pathname)}>
          <ListItemIcon>
            <Http/>
          </ListItemIcon>
          <ListItemText primary={'Requests'}/>
        </ListItem>
        <ListItem
          button
          onClick={onUsersRequests}
          selected={/\/projects\/[0-9]+\/custom-requests/.test(location.pathname)}
        >
          <ListItemIcon>
            <Send/>
          </ListItemIcon>
          <ListItemText primary={'Custom requests'}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LibraryBooks/>
          </ListItemIcon>
          <ListItemText primary={'API Libraries'}/>
        </ListItem>
        <ListItem button onClick={onPerformance} selected={/\/projects\/[0-9]+\/performance/.test(location.pathname)}>
          <ListItemIcon>
            <FlashOn/>
          </ListItemIcon>
          <ListItemText primary={'Performance'}/>
        </ListItem>
        <ListItem button onClick={onTracks} selected={/\/projects\/[0-9]+\/tracks/.test(location.pathname)}>
          <ListItemIcon>
            <Dvr/>
          </ListItemIcon>
          <ListItemText primary={'Tracks'}/>
        </ListItem>
        <ListItem button onClick={onStats} selected={/\/projects\/[0-9]+\/stats/.test(location.pathname)}>
          <ListItemIcon>
            <BarChart/>
          </ListItemIcon>
          <ListItemText primary={'Stats'}/>
        </ListItem>
        <ListItem button onClick={onSettings} selected={/\/projects\/[0-9]+\/settings/.test(location.pathname)}>
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
      <div className={'flex-grow-1'}/>
      <DrawerSelectProject drawerOpen={open}/>
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
