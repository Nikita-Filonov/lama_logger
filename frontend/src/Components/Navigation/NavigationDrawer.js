import React from "react";
import {DrawerHeaderStyled, DrawerStyled} from "../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListItemText from "@mui/material/ListItemText";
import {Api, Logout} from "@mui/icons-material";
import {Settings} from "@material-ui/icons";
import {useTheme} from "@mui/material/styles";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setRequest} from "../../Redux/Requests/requestsActions";

const NavigationDrawer = ({open, onClose, setRequest}) => {
  const history = useHistory();
  const theme = useTheme();

  const onProjects = () => {
    history.push('/projects')
    setRequest({})
  }

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
        <ListItem button>
          <ListItemIcon>
            <Api/>
          </ListItemIcon>
          <ListItemText primary={'API'}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Settings/>
          </ListItemIcon>
          <ListItemText primary={'Settings'}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Logout/>
          </ListItemIcon>
          <ListItemText primary={'Logout'}/>
        </ListItem>
      </List>
    </DrawerStyled>
  )
}

export default connect(
  null,
  {
    setRequest
  },
)(NavigationDrawer);
