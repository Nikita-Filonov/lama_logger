import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Autocomplete, Checkbox, Grid, TextField} from "@mui/material";
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {
  REQUESTS_HOSTS_FILTERS,
  REQUESTS_METHODS_FILTERS,
  REQUESTS_STATUS_CODES_FILTERS
} from "../../../../Utils/Constants";
import {useProjectSettings} from "../../../../Providers/Requests/ProjectSettingsProvider";
import {StatusCodeIndicator} from "../../../../Components/Blocks/Requests/Requests/StatusCodeIndicator";
import {SaveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {usePermissions} from "../../../../Providers/Users/PermissionsProvider";
import {PROJECT_SETTINGS} from "../../../../Utils/Permissions/Projects";


const RequestsInboundDataFilters = ({project, projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const {isAllowed} = usePermissions();
  const {load, request, updateProjectSettings} = useProjectSettings();
  const [excludeHosts, setExcludeHosts] = useState(projectSettings?.excludeHosts);
  const [excludeMethods, setExcludeMethods] = useState(projectSettings?.excludeMethods);
  const [excludeStatuses, setExcludeStatuses] = useState(projectSettings?.excludeStatuses);

  useEffect(() => {
    setExcludeHosts(projectSettings?.excludeHosts);
    setExcludeMethods(projectSettings?.excludeMethods);
    setExcludeStatuses(projectSettings?.excludeStatuses);
  }, [projectSettings])

  const disabled = useMemo(() => {
    if (excludeHosts !== projectSettings?.excludeHosts) {
      return false;
    }

    if (excludeMethods !== projectSettings?.excludeMethods) {
      return false;
    }

    return excludeStatuses === projectSettings?.excludeStatuses;
  }, [excludeHosts, excludeMethods, excludeStatuses, projectSettings]);

  const onSave = async () => await updateProjectSettings(project.id, {excludeHosts, excludeMethods, excludeStatuses});

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Inbound data filters'}/>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          value={excludeHosts}
          size={'small'}
          key={load}
          multiple
          freeSolo
          className={'w-50'}
          options={REQUESTS_HOSTS_FILTERS}
          onChange={(_, value) => setExcludeHosts(value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox size={'small'} style={{marginRight: 8}} checked={selected}/>
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Hosts"
              placeholder="Type and press Enter to add"
              size={'small'}
              variant={'standard'}
              helperText={'Define the hosts which you want to exclude. For example you can exclude ' +
              'requests from localhost, 127.0.0.1 etc.'}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          value={excludeMethods}
          size={'small'}
          key={load}
          multiple
          freeSolo
          className={'w-50'}
          options={REQUESTS_METHODS_FILTERS}
          onChange={(_, value) => setExcludeMethods(value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox size={'small'} style={{marginRight: 8}} checked={selected}/>
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
          key={load}
          multiple
          freeSolo
          className={'w-50'}
          options={Object.values(REQUESTS_STATUS_CODES_FILTERS).flat()}
          onChange={(_, value) => setExcludeStatuses(value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option.toString()}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox size={'small'} style={{marginRight: 8}} checked={selected}/>
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
            disabled={disabled || !isAllowed([PROJECT_SETTINGS.update])}
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
