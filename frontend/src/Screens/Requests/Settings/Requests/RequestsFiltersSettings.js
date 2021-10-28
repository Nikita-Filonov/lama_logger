import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Autocomplete, Button, Checkbox, Grid, IconButton, TextField, Typography} from "@mui/material";
import {
  REQUESTS_METHODS_FILTERS,
  REQUESTS_STATUS_CODES_FILTERS,
  REQUESTS_STATUS_CODES_TYPES
} from "../../../../Utils/Constants";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {Add, Close, SaveOutlined} from "@mui/icons-material";
import {useProjectSettings} from "../../../../Providers/Requests/ProjectSettingsProvider";
import {StatusCodesAutocomplete} from "../../../../Components/Blocks/Requests/Settings/Requests/Filters/StatusCodesAutocomplete";


const RequestsFiltersSettings = ({project, projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const {load, request, updateProjectSettings} = useProjectSettings();
  const [filterMethods, setFilterMethods] = useState(projectSettings?.filterMethods);
  const [filterStatusCodes, setFilterStatusCodes] = useState(projectSettings?.filterStatusCodes);
  const [filterHeaders, setFilterHeaders] = useState(projectSettings?.filterHeaders)

  useEffect(() => {
    setFilterMethods(projectSettings?.filterMethods);
    setFilterStatusCodes(projectSettings?.filterStatusCodes);
  }, [projectSettings])

  const disabled = useMemo(() => {
    if (filterMethods !== projectSettings?.filterMethods) {
      return false;
    }

    if (filterHeaders !== projectSettings?.filterHeaders) {
      return false;
    }

    return filterStatusCodes === projectSettings?.filterStatusCodes;
  }, [filterMethods, filterStatusCodes, projectSettings]);

  const onChangeCodes = (type, newValue) => setFilterStatusCodes({...filterStatusCodes, [type]: newValue.map(Number)});
  const onSave = async () => await updateProjectSettings(project.id, {filterMethods, filterStatusCodes});
  const onChangeHeader = async (type = 'key', index, value) =>
    setFilterHeaders(filterHeaders?.headers?.map((header, i) => i === index ? {...header, [type]: value} : header));


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

      <Typography className={'mt-3'}>Headers</Typography>
      <Typography variant={'body2'}>Setup headers, so you will be able to choose headers filters quickly</Typography>
      <Grid container xs={10} className={'mt-3'} spacing={2}>
        <Grid item xs={5}>
          <Typography>Keys</Typography>
          {filterHeaders?.keys?.map((headerKey, index) =>
            <div key={index} className={'d-flex justify-content-center align-items-center mt-2'}>
              <TextField
                fullWidth
                value={headerKey}
                variant={'standard'}
                size={'small'}
                placeholder={'Key'}
                label={'Key'}
                className={'me-1'}
              />
              <IconButton size={'small'} sx={{mt: 2}}>
                <Close fontSize={'small'}/>
              </IconButton>
            </div>
          )}
          <Button
            fullWidth
            startIcon={<Add/>}
            sx={{mt: 2}}
            size={'small'}
            color={'inherit'}
            className={'justify-content-start'}
          >
            New key
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Typography>Values</Typography>
          {filterHeaders?.values?.map((headerValue, index) =>
            <div key={index} className={'d-flex justify-content-center align-items-center mt-2'}>
              <TextField
                fullWidth
                value={headerValue}
                variant={'standard'}
                size={'small'}
                placeholder={'Key'}
                label={'Key'}
                className={'me-2'}
              />
              <IconButton size={'small'} sx={{mt: 2}}>
                <Close fontSize={'small'}/>
              </IconButton>
            </div>
          )}
          <Button
            fullWidth
            startIcon={<Add/>}
            sx={{mt: 2}}
            size={'small'}
            color={'inherit'}
            className={'justify-content-start'}
          >
            New value
          </Button>
        </Grid>
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
)(RequestsFiltersSettings);
