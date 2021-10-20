import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Autocomplete, Checkbox, Grid, InputAdornment, TextField} from "@mui/material";
import {CODES, REQUESTS_METHODS_FILTERS, REQUESTS_SUCCESSES_FILTERS} from "../../../../Utils/Constants";
import {StatusCodeIndicator} from "../../../../Components/Blocks/Requests/Requests/StatusCodeIndicator";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {SaveOutlined} from "@mui/icons-material";
import {useProjectSettings} from "../../../../Providers/Requests/ProjectSettingsProvider";


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
      {REQUESTS_SUCCESSES_FILTERS.map((successes, index) =>
        <Grid item xs={12} className={'mt-3'} key={index}>
          <Autocomplete
            value={filterStatusCodes[successes.value]}
            size={'small'}
            key={load}
            multiple
            freeSolo
            className={'w-50'}
            options={CODES[successes.value]}
            onChange={(_, value) =>
              onChangeCodes(successes.value, value)}
            disableCloseOnSelect
            getOptionLabel={(option) => option.toString()}
            renderOption={(props, option, {selected}) => (
              <li {...props}>
                <Checkbox size={'small'} style={{marginRight: 8}} checked={selected}/>
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Status codes "${successes.value}"`}
                placeholder="Select from list or type custom"
                size={'small'}
                variant={'standard'}
                helperText={`Select "${successes.value}" status codes which you want 
                to see in requests filters section`}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <React.Fragment>
                      <InputAdornment position="start">
                        <StatusCodeIndicator statusCode={successes?.code}/>
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
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
