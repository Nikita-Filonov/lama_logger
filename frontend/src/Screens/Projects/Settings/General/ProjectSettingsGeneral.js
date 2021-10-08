import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Button, Grid, TextField} from "@mui/material";
import {connect} from "react-redux";
import {DeleteOutline, SaveOutlined} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";
import {UserOption} from "../../../../Components/Items/Common/UserOption";
import {useProjects} from "../../../../Providers/ProjectsProvider";
import Box from "@mui/material/Box";
import {ButtonSpinner} from "../../../../Components/Blocks/Common/ButtonSpiner";


const ProjectSettingsGeneral = ({project}) => {
  const classes = ProjectSettingsStyles();
  const {request, updateProject} = useProjects();
  const [title, setTitle] = useState(project?.title)
  const [creator, setCreator] = useState(project?.creator);
  const [description, setDescription] = useState(project?.description)

  useEffect(() => {
    setTitle(project?.title)
    setCreator(project.creator)
    setDescription(project?.description)
  }, [project])

  const onSave = async () => await updateProject(project.id, {title, description, creator: creator?.id})

  const disabled = useMemo(() => {
    if (title !== project?.title) {
      return false;
    }
    if (description !== project?.description) {
      return false;
    }

    return creator?.id === project?.creator?.id;

  }, [title, description, creator])
  const optionLabel = useCallback((option) => option.username ? option.username : option.email, [])

  return (
    <div className={classes.contentContainer}>
      <Grid item xs={12}>
        <TextField
          value={title}
          onChange={event => setTitle(event.target.value)}
          label="Project name"
          variant="standard"
          placeholder={'Project name'}
          className={'w-50'}
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
          closeIcon={null}
          options={project?.members?.map(member => member.user)}
          defaultValue={project?.creator}
          getOptionLabel={(option, state) => optionLabel(option)}
          renderOption={(option, state) => <UserOption label={optionLabel(option)}/>}
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
          <Button
            onClick={onSave}
            startIcon={<SaveOutlined/>}
            variant="text"
            disabled={disabled || request}
          >
            Save changes
            {request && <ButtonSpinner/>}
          </Button>
        </Box>
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
  null,
)(ProjectSettingsGeneral);
