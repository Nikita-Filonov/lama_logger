import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ProjectSettingsHeader} from "../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {SaveOutlined} from "@mui/icons-material";
import {connect} from "react-redux";
import {useUserSettings} from "../../../Providers/Users/UserSettingsProvider";
import HeadersFiltersSettings
  from "../../../Components/Blocks/Requests/Settings/Requests/Filters/HeadersFiltersSettings";

const CustomRequestsHeadersSettings = ({userSettings}) => {
  const classes = ProjectSettingsStyles();
  const {request, updateUserSettings} = useUserSettings();
  const [customRequestsHeaders, setCustomRequestsHeaders] = useState(userSettings?.customRequestsHeaders);

  useEffect(() => setCustomRequestsHeaders(userSettings?.customRequestsHeaders), [userSettings?.customRequestsHeaders]);

  const disabled = useMemo(() =>
    JSON.stringify(userSettings?.customRequestsHeaders) === JSON.stringify(customRequestsHeaders),
    [userSettings?.customRequestsHeaders, customRequestsHeaders]
  );
  const onSave = async () => await updateUserSettings({customRequestsHeaders});

  const onRemoveHeader = (type = 'keys', index) => {
    const copyHeaders = [...customRequestsHeaders[type]];
    copyHeaders.splice(index, 1);
    setCustomRequestsHeaders({...customRequestsHeaders, [type]: [...copyHeaders]});
  }
  const onChangeHeader = useCallback(async (type = 'keys', index, value) =>
    setCustomRequestsHeaders({
      ...customRequestsHeaders,
      [type]: customRequestsHeaders[type]?.map((header, i) => i === index ? value : header)
    }), [customRequestsHeaders]);
  const onNewHeader = async (type = 'keys') => setCustomRequestsHeaders({
    ...customRequestsHeaders,
    [type]: [...customRequestsHeaders[type], '']
  });

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Custom requests headers'}/>
      <Typography className={'mt-3'}>In this section you can change or add new headers for quick use</Typography>

      <HeadersFiltersSettings
        filterHeaders={customRequestsHeaders}
        onNewHeader={onNewHeader}
        onRemoveHeader={onRemoveHeader}
        onChangeHeader={onChangeHeader}
      />

      <Grid item xs={12} className={'mt-3 mb-5'}>
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
