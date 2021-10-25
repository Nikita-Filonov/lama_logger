import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Button, Link, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {baseUrl} from "../../../../Utils/Constants";
import {Link as RouterLink, useHistory} from 'react-router-dom';


const IntegrationsSettings = ({project, setConfirmAction}) => {
  const classes = ProjectSettingsStyles();
  const history = useHistory();

  const onSlack = () => {

  }

  const onTelegram = () => {
    if (!project?.telegramChannel) {
      setConfirmAction({
        modal: true,
        title: 'Telegram setup',
        description: <Typography>
          To start receiving notifications in telegram you have
          to <Link onClick={() => setConfirmAction({modal: false})} component={RouterLink} underline={'none'}
                   to={`/projects/${project.id}/settings/notifications`}>setup</Link> telegram channel
        </Typography>,
        confirmButton: 'Go to settings',
        action: () => {
          history.push(`/projects/${project.id}/settings/notifications`)
          setConfirmAction({modal: false})
        }
      })
    }
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
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Slack" src={baseUrl + 'static/images/integrations/telegram.png'}/>
          </ListItemAvatar>
          <ListItemText
            primary={'Telegram bot'}
            secondary={'Connect Lama Logger to your workspace, so you can get notifications, about errors, tracks...'}
          />
          <Button variant={'outlined'} color={'inherit'} onClick={onTelegram}>
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
    setConfirmAction
  },
)(IntegrationsSettings);
