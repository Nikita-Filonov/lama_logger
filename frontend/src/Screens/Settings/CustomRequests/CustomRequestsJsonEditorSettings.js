import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ProjectSettingsHeader} from "../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {SaveOutlined} from "@mui/icons-material";
import {connect} from "react-redux";
import {useUserSettings} from "../../../Providers/Users/UserSettingsProvider";

const CustomRequestsJsonEditorSettings = ({userSettings}) => {
  const classes = ProjectSettingsStyles();
  const {request, updateUserSettings} = useUserSettings();
  const [jsonEditor, setJsonEditor] = useState(userSettings?.jsonEditor);

  useEffect(() => setJsonEditor(userSettings?.jsonEditor), [userSettings?.jsonEditor]);

  const disabled = useMemo(() =>
    JSON.stringify(userSettings?.jsonEditor) === JSON.stringify(jsonEditor),
    [userSettings?.jsonEditor, jsonEditor]
  );
  const onChange = async (value, key) => setJsonEditor({...jsonEditor, [key]: value});
  const onSave = async () => await updateUserSettings({jsonEditor});

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Json editor settings'}/>
      <Typography className={'mt-3'}>In this section you can change settings of json editor</Typography>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          type={'number'}
          value={jsonEditor?.tabSize || 1}
          onChange={async event => await onChange(parseInt(event.target.value), 'tabSize')}
          label="Editor tab size"
          variant="standard"
          placeholder={'2 by default'}
          className={'w-50'}
          helperText={'Number of blanks from left edge to character'}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={async (_, checked) => await onChange(checked, 'enableBasicAutocompletion')}
              />
            }
            label="Enable Basic Autocomplete"
            checked={jsonEditor?.enableBasicAutocompletion}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={async (_, checked) => await onChange(checked, 'enableLiveAutocompletion')}
              />
            }
            label="Enable Live Autocomplete"
            checked={jsonEditor?.enableLiveAutocompletion}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={async (_, checked) => await onChange(checked, 'showGutter')}
              />
            }
            label="Show Gutter"
            checked={jsonEditor?.showGutter}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={async (_, checked) => await onChange(checked, 'highlightActiveLine')}
              />
            }
            label="Highlight Active Line"
            checked={jsonEditor?.highlightActiveLine}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={async (_, checked) => await onChange(checked, 'enableSnippets')}
              />
            }
            label="Enable Snippets"
            checked={jsonEditor?.enableSnippets}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={async (_, checked) => await onChange(checked, 'showLineNumbers')}
              />
            }
            label="Show Line Numbers"
            checked={jsonEditor?.showLineNumbers}
          />
        </FormGroup>
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
  userSettings: state.users.userSettings,
})

export default connect(
  getState,
  null,
)(CustomRequestsJsonEditorSettings);
