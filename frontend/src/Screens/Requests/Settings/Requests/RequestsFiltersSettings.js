import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Autocomplete, Checkbox, Grid, TextField} from "@mui/material";
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


const RequestsFiltersSettings = ({project, projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const {load, request, updateProjectSettings} = useProjectSettings();
  const [filterMethods, setFilterMethods] = useState(projectSettings?.filterMethods);
  const [filterStatusCodes, setFilterStatusCodes] = useState(projectSettings?.filterStatusCodes);

  useEffect(() => {
    setFilterMethods(projectSettings?.filterMethods);
    setFilterStatusCodes(projectSettings?.filterStatusCodes);
  }, [projectSettings])

  const disabled = useMemo(() => {
    if (filterMethods !== projectSettings?.filterMethods) {
      return false;
    }

    return filterStatusCodes === projectSettings?.filterStatusCodes;
  }, [filterMethods, filterStatusCodes, projectSettings]);

  const onChangeCodes = (type, newValue) => setFilterStatusCodes({...filterStatusCodes, [type]: newValue})

  const onSave = async () => await updateProjectSettings(project.id, {filterMethods, filterStatusCodes})

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Requests filters'}/>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          value={filterMethods}
          size={'small'}
          key={load}
          multiple
          freeSolo
          className={'w-50'}
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
      {REQUESTS_STATUS_CODES_TYPES.map((codes, index) =>
        <Grid item xs={12} className={'mt-3'} key={index}>
          <StatusCodesAutocomplete
            type={codes.value}
            load={load}
            value={filterStatusCodes[codes.value]}
            options={REQUESTS_STATUS_CODES_FILTERS[codes.value]}
            onChange={onChangeCodes}
          />
        </Grid>
      )}
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
)(RequestsFiltersSettings);
