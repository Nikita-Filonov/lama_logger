import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Autocomplete, Checkbox, Grid, TextField} from "@mui/material";
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {CODES, REQUESTS_METHODS_FILTERS} from "../../../../Utils/Constants";
import {useProjectSettings} from "../../../../Providers/Requests/ProjectSettingsProvider";
import {StatusCodeIndicator} from "../../../../Components/Blocks/Requests/Requests/StatusCodeIndicator";
import {SaveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";


const RequestsInboundDataFilters = ({project, projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const {request, updateProjectSettings} = useProjectSettings();
  const [excludeMethods, setExcludeMethods] = useState(projectSettings?.excludeMethods);
  const [excludeStatuses, setExcludeStatuses] = useState(projectSettings?.excludeStatuses);

  useEffect(() => {
    setExcludeMethods(projectSettings?.excludeMethods);
    setExcludeStatuses(projectSettings?.excludeStatuses);
  }, [projectSettings])

  const disabled = useMemo(() => {
    if (excludeMethods !== projectSettings?.excludeMethods) {
      return false;
    }

    return excludeStatuses === projectSettings?.excludeStatuses;
  }, [excludeMethods, excludeStatuses, projectSettings])

  const onSave = async () => await updateProjectSettings(project.id, {excludeMethods, excludeStatuses})

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Inbound data filters'}/>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          value={excludeMethods}
          size={'small'}
          key={projectSettings?.excludeMethods}
          multiple
          freeSolo
          className={'w-50'}
          options={REQUESTS_METHODS_FILTERS}
          onChange={(_, value) => setExcludeMethods(value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox style={{marginRight: 8}} checked={selected}/>
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Methods"
              placeholder="Select from list or type custom"
              size={'small'}
              variant={'standard'}
              helperText={'Select methods which you want to exclude. For example if set to "GET", ' +
              '"POST", then requests with this methods wont be created.'}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          value={excludeStatuses}
          size={'small'}
          key={projectSettings?.excludeStatuses}
          multiple
          freeSolo
          className={'w-50'}
          options={[...CODES.success, ...CODES.redirect, ...CODES.error]}
          onChange={(_, value) => setExcludeStatuses(value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox style={{marginRight: 8}} checked={selected}/>
              {option}
              <div className={'flex-grow-1'}/>
              <StatusCodeIndicator statusCode={option}/>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Status codes"
              placeholder="Select from list or type custom"
              size={'small'}
              variant={'standard'}
              helperText={'Select methods which you want to exclude. For example if set to "GET", ' +
              '"POST", then requests with this methods wont be created.'}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <LoadingButton
            onClick={onSave}
            loading={request}
            loadingPosition="start"
            startIcon={<SaveOutlined/>}
            variant="text"
            disabled={disabled}
          >
            Save changes
          </LoadingButton>
        </Box>
      </Grid>
    </div>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  projectSettings: state.projects.projectSettings
})

export default connect(
  getState,
  null,
)(RequestsInboundDataFilters);
