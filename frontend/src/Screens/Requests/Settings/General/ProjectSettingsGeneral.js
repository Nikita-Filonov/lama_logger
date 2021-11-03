import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Autocomplete, Button, Grid, TextField} from "@mui/material";
import {connect} from "react-redux";
import {UserOption} from "../../../../Components/Items/Common/UserOption";
import {useProjects} from "../../../../Providers/ProjectsProvider";
import Box from "@mui/material/Box";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";
import {useAlerts} from "../../../../Providers/AlertsProvider";
import {removeProject} from "../../../../Redux/Projects/projectActions";
import {useHistory} from "react-router-dom";
import {DeleteOutline, SaveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {PermissionsProvider} from "../../../../Providers/Users/PermissionsProvider";


const ProjectSettingsGeneral = ({project, setConfirmAction, removeProject}) => {
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
  const optionLabel = useCallback((option) => option.username ? option.username : option.email, [])

  const onSave = async () => await updateProject(project.id, {title, short, description, creator: creator?.id})
  const onArchive = async () => {
    setConfirmAction({
      modal: true,
      title: 'Archive project?',
      description: 'You will be able to restore it later',
      action: async () => {
        setAlert({message: 'Project was archived', level: 'success'})
        removeProject(project.id)
        history.push('/projects')
        await updateProject(project.id, {archived: true}, true)
        localStorage.removeItem('project')
      },
      confirmButton: 'Archive'
    })
  }

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'General project settings'}/>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          value={title}
          onChange={event => setTitle(event.target.value)}
          label="Project name"
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
          label="Short name"
          variant="standard"
          placeholder={'Short name'}
          className={'w-50'}
          inputProps={{maxLength: 2}}
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
        <Autocomplete
          className={'w-50'}
          autoHighlight
          disableClearable
          options={project?.members?.map(member => member.user)}
          defaultValue={project?.creator}
          getOptionLabel={(option, _) => optionLabel(option)}
          renderOption={(props, option) =>
            <UserOption key={option} props={props} label={optionLabel(option)}/>}
          onChange={(event, value) => setCreator(value)}
          renderInput={(params) =>
            <TextField
              {...params}
              fullWidth
              label={'Project creator'}
              variant={'standard'}
            />
          }
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <PermissionsProvider action={'Project.Update'}>
            {allowed =>
              <LoadingButton
                onClick={onSave}
                loading={request}
                loadingPosition="start"
                startIcon={<SaveOutlined/>}
                disabled={disabled || !allowed}
                variant="text"
              >
                Save changes
              </LoadingButton>
            }
          </PermissionsProvider>
        </Box>
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Button onClick={onArchive} startIcon={<ArchiveOutlinedIcon/>} variant="text">Archive project</Button>
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Button startIcon={<DeleteOutline/>} variant="text" style={{color: 'red'}}>Delete project</Button>
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
)(ProjectSettingsGeneral);
