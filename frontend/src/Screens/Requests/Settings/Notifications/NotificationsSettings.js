import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Grid, TextField} from "@mui/material";
import {connect} from "react-redux";
import {useProjects} from "../../../../Providers/ProjectsProvider";
import Box from "@mui/material/Box";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";
import {useAlerts} from "../../../../Providers/AlertsProvider";
import {removeProject} from "../../../../Redux/Projects/projectActions";
import {useHistory} from "react-router-dom";
import {SaveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";


const NotificationsSettings = ({project, setConfirmAction, removeProject}) => {
  const classes = ProjectSettingsStyles();
  const history = useHistory();
  const {setAlert} = useAlerts();
  const {request, updateProject} = useProjects();
  const [title, setTitle] = useState(project?.title);
  const [short, setShort] = useState(project?.short);
  const [creator, setCreator] = useState(project?.creator);
  const [description, setDescription] = useState(project?.description);

  useEffect(() => {
    setTitle(project?.title)
    setCreator(project.creator)
    setDescription(project?.description)
  }, [project])

  const disabled = useMemo(() => {
    if (title !== project?.title) {
      return false;
    }

    if (short !== project.short) {
      return false;
    }

    if (description !== project?.description) {
      return false;
    }

    return creator?.id === project?.creator?.id;
  }, [title, short, description, creator])

  const onSave = async () => await updateProject(project.id, {title, short, description, creator: creator?.id})

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'General project settings'}/>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          value={title}
          onChange={event => setTitle(event.target.value)}
          label="Telegram channel or group"
          variant="standard"
          placeholder={'Project name'}
          className={'w-50'}
          inputProps={{maxLength: 255}}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          value={short}
          onChange={event => setShort(event.target.value)}
          label="Slack channel"
          variant="standard"
          placeholder={'Slack channel'}
          className={'w-50'}
          inputProps={{maxLength: 255}}
          helperText={'Short name for your project. For example if project name is Lama Logger, then short name ' +
          'will be LL'}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          multiline
          value={description}
          onChange={event => setDescription(event.target.value)}
          label="Project description"
          variant="standard"
          placeholder={'Project description'}
          className={'w-50'}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <LoadingButton
            onClick={onSave}
            loading={request}
            loadingPosition="start"
            startIcon={<SaveOutlined/>}
            disabled={disabled}
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
})

export default connect(
  getState,
  {
    removeProject,
    setConfirmAction
  },
)(NotificationsSettings);
