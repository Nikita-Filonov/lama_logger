import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ProjectSettingsHeader} from "../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {SaveOutlined} from "@mui/icons-material";
import {connect} from "react-redux";
import {useUserSettings} from "../../../Providers/Users/UserSettingsProvider";

const CustomRequestsHeadersSettings = ({userSettings}) => {
  const classes = ProjectSettingsStyles();
  const {request, updateUserSettings} = useUserSettings();
  const [jsonEditor, setJsonEditor] = useState(userSettings?.jsonEditor);

  useEffect(() => setJsonEditor(userSettings?.jsonEditor), [userSettings?.jsonEditor]);

  const disabled = useMemo(() =>
    JSON.stringify(userSettings?.jsonEditor) === JSON.stringify(jsonEditor),
    [userSettings?.jsonEditor, jsonEditor]
  );
  const onSave = async () => await updateUserSettings({jsonEditor});

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Custom requests headers'}/>
      <Typography className={'mt-3'}>In this section you can change or add new headers for quick use</Typography>


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
)(CustomRequestsHeadersSettings);
