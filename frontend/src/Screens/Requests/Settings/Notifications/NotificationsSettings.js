import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Avatar, Grid, InputAdornment, TextField} from "@mui/material";
import {connect} from "react-redux";
import {useProjects} from "../../../../Providers/ProjectsProvider";
import Box from "@mui/material/Box";
import {SaveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {baseUrl} from "../../../../Utils/Constants";
import {usePermissions} from "../../../../Providers/Users/PermissionsProvider";
import {PROJECT_SETTINGS} from "../../../../Utils/Permissions/Projects";


const NotificationsSettings = ({project}) => {
  const classes = ProjectSettingsStyles();
  const {isAllowed} = usePermissions();
  const {request, updateProject} = useProjects();
  const [telegramChannel, setTelegramChannel] = useState(project?.telegramChannel);
  const [slackChannel, setSlackChannel] = useState(project?.slackChannel)

  useEffect(() => {
    setTelegramChannel(project?.telegramChannel)
    setSlackChannel(project?.slackChannel)
  }, [project])

  const disabled = useMemo(() => {
    if (telegramChannel !== project?.telegramChannel) {
      return false;
    }

    return slackChannel === project?.slackChannel;
  }, [telegramChannel, slackChannel, project?.telegramChannel, project?.slackChannel])

  const onSave = async () => await updateProject(project.id, {telegramChannel, slackChannel})

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Notifications settings'}/>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          value={telegramChannel}
          onChange={event => setTelegramChannel(event.target.value)}
          label="Telegram channel or group"
          variant="standard"
          placeholder={'e2e'}
          className={'w-50'}
          inputProps={{maxLength: 255}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar style={{width: 22, height: 22}} src={baseUrl + 'static/images/integrations/telegram.png'}/>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          value={slackChannel}
          onChange={event => setSlackChannel(event.target.value)}
          label="Slack channel"
          variant="standard"
          placeholder={'e2e'}
          className={'w-50'}
          inputProps={{maxLength: 255}}
          helperText={'Short name for your project. For example if project name is Lama Logger, then short name ' +
          'will be LL'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar style={{width: 22, height: 22}} src={baseUrl + 'static/images/integrations/slack.png'}/>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <LoadingButton
            onClick={onSave}
            loading={request}
            loadingPosition="start"
            startIcon={<SaveOutlined/>}
            disabled={disabled || !isAllowed([PROJECT_SETTINGS.update])}
            variant="text"
          >
            Save changes
          </LoadingButton>
        </Box>
      </Grid>
    </div>
  )
}


const getState = (state) => ({
    project: state.projects.project
  }
)

export default connect(
  getState,
  null,
)(NotificationsSettings);
