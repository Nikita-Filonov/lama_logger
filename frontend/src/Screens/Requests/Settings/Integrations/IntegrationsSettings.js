import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";
import {removeProject} from "../../../../Redux/Projects/projectActions";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Button, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {baseUrl} from "../../../../Utils/Constants";


const IntegrationsSettings = ({project, setConfirmAction, removeProject}) => {
  const classes = ProjectSettingsStyles();

  const onSlack = () => {

  }

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Integrations'}/>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Slack" src={baseUrl + 'static/images/integrations/slack.png'}/>
          </ListItemAvatar>
          <ListItemText
            primary={'Slack integration'}
            secondary={'Connect Lama Logger to your workspace, so you can get notifications, about errors, tracks...'}
          />
          <Button variant={'outlined'} color={'inherit'} onClick={onSlack}>
            Connect
          </Button>
        </ListItem>
      </List>
    </div>
  )
}


const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  {
    removeProject,
    setConfirmAction
  },
)(IntegrationsSettings);
