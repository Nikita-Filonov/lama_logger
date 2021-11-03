import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Autocomplete, Checkbox, Grid, TextField, Typography} from "@mui/material";
import {
  REQUESTS_METHODS_FILTERS,
  REQUESTS_STATUS_CODES_FILTERS,
  REQUESTS_STATUS_CODES_TYPES
} from "../../../../Utils/Constants";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {SaveOutlined} from "@mui/icons-material";
import {useProjectSettings} from "../../../../Providers/Requests/ProjectSettingsProvider";
import {StatusCodesAutocomplete} from "../../../../Components/Blocks/Requests/Settings/Requests/Filters/StatusCodesAutocomplete";
import HeadersFiltersSettings
  from "../../../../Components/Blocks/Requests/Settings/Requests/Filters/HeadersFiltersSettings";
import {usePermissions} from "../../../../Providers/Users/PermissionsProvider";
import {PROJECT_SETTINGS} from "../../../../Utils/Permissions/Projects";


const RequestsFiltersSettings = ({project, projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const {isAllowed} = usePermissions();
  const {load, request, updateProjectSettings} = useProjectSettings();
  const [filterMethods, setFilterMethods] = useState(projectSettings?.filterMethods);
  const [filterStatusCodes, setFilterStatusCodes] = useState(projectSettings?.filterStatusCodes);
  const [filterHeaders, setFilterHeaders] = useState(projectSettings?.filterHeaders)

  useEffect(() => {
    setFilterMethods(projectSettings?.filterMethods);
    setFilterStatusCodes(projectSettings?.filterStatusCodes);
    setFilterHeaders(projectSettings?.filterHeaders);
  }, [projectSettings])

  const disabled = useMemo(() => {
    if (filterMethods !== projectSettings?.filterMethods) {
      return false;
    }

    if (filterHeaders !== projectSettings?.filterHeaders) {
      return false;
    }

    return filterStatusCodes === projectSettings?.filterStatusCodes;
  }, [filterMethods, filterStatusCodes, filterHeaders, projectSettings]);

  const onChangeCodes = (type, newValue) => setFilterStatusCodes({...filterStatusCodes, [type]: newValue.map(Number)});
  const onSave = async () => await updateProjectSettings(project.id, {filterMethods, filterStatusCodes, filterHeaders});
  const onRemoveHeader = (type = 'keys', index) => {
    const copyHeaders = [...filterHeaders[type]];
    copyHeaders.splice(index, 1);
    setFilterHeaders({...filterHeaders, [type]: [...copyHeaders]});
  }
  const onChangeHeader = useCallback(async (type = 'keys', index, value) =>
    setFilterHeaders({
      ...filterHeaders,
      [type]: filterHeaders[type]?.map((header, i) => i === index ? value : header)
    }), [filterHeaders]);
  const onNewHeader = async (type = 'keys') => setFilterHeaders({
    ...filterHeaders,
    [type]: [...filterHeaders[type], '']
  });

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Requests filters'}/>
      <Typography className={'mt-3'}>Methods</Typography>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          value={filterMethods}
          size={'small'}
          key={load}
          multiple
          freeSolo
          className={'w-75'}
          options={REQUESTS_METHODS_FILTERS}
          onChange={(_, value) => setFilterMethods(value)}
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
              helperText={'Select methods which you want to see in requests filters section'}
            />
          )}
        />
      </Grid>
      <Typography className={'mt-3'}>Status codes</Typography>
      {REQUESTS_STATUS_CODES_TYPES.map((codes, index) =>
        <Grid item xs={12} className={'mt-3'} key={index}>
          <StatusCodesAutocomplete
            type={codes.value}
            load={load}
            value={filterStatusCodes[codes.value]}
            options={REQUESTS_STATUS_CODES_FILTERS[codes.value]}
            onChange={onChangeCodes}
            className={'w-75'}
          />
        </Grid>
      )}

      <HeadersFiltersSettings
        filterHeaders={filterHeaders}
        onNewHeader={onNewHeader}
        onRemoveHeader={onRemoveHeader}
        onChangeHeader={onChangeHeader}
      />

      <Grid item xs={12} className={'mt-3'} sx={{mb: 6}}>
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
)(RequestsFiltersSettings);
