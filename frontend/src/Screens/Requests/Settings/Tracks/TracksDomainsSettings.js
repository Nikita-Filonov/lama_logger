import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, List, Typography} from "@mui/material";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import Domain from "../../../../Components/Items/Reuqests/Settings/Tracks/Domain";
import CreateTrackDomain from "../../../../Components/Modals/Requests/Settings/Tracks/CreateTrackDomain";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {SaveOutlined} from "@mui/icons-material";
import {useProjectSettings} from "../../../../Providers/Requests/ProjectSettingsProvider";
import {usePermissions} from "../../../../Providers/Users/PermissionsProvider";
import {PROJECT_SETTINGS} from "../../../../Utils/Permissions/Projects";


const TracksDomainsSettings = ({project, projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const {isAllowed} = usePermissions();
  const {request, updateProjectSettings} = useProjectSettings();
  const [trackDomains, setTrackDomains] = useState(projectSettings?.trackDomains);
  const [createDomainModal, setCreateDomainModal] = useState(false);

  const disabled = useMemo(() => trackDomains === projectSettings?.trackDomains, [trackDomains])

  useEffect(() => setTrackDomains(projectSettings?.trackDomains), [projectSettings?.trackDomains]);

  const onRemove = async (index) => {
    const copyTrackDomains = [...trackDomains];
    copyTrackDomains.splice(index, 1);
    setTrackDomains(copyTrackDomains);
    await updateProjectSettings(project.id, {trackDomains: copyTrackDomains});
  }
  const onChange = async (type = 'pattern', index, value) =>
    setTrackDomains(trackDomains.map((p, i) => i === index ? {...p, [type]: value} : p));
  const onSave = async () => await updateProjectSettings(project.id, {trackDomains});

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Tracks domains'}/>
      <Typography variant={'body1'} className={'mt-3'}>
        Here you can setup any domains to use them as template in tracks
      </Typography>
      <List dense>
        {trackDomains?.map((domain, index) =>
          <Domain
            key={index}
            domain={domain}
            index={index}
            onChange={onChange}
            onRemove={onRemove}
          />
        )}
      </List>
      {trackDomains?.length > 0 && <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <LoadingButton
            loadingPosition="start"
            startIcon={<SaveOutlined/>}
            disabled={disabled || !isAllowed([PROJECT_SETTINGS.update])}
            variant="text"
            onClick={onSave}
            loading={request}
          >
            Save changes
          </LoadingButton>
        </Box>
      </Grid>}
      <ZoomFab title={'New domain'} action={() => setCreateDomainModal(true)}/>
      <CreateTrackDomain
        modal={createDomainModal}
        setModal={setCreateDomainModal}
        trackDomains={trackDomains}
      />
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
)(TracksDomainsSettings);
