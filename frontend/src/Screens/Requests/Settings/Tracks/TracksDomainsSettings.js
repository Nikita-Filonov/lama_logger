import React, {useEffect, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {List, Typography} from "@mui/material";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import {Domain} from "../../../../Components/Items/Reuqests/Settings/Tracks/Domain";
import CreateTrackDomain from "../../../../Components/Modals/Requests/Settings/Tracks/CreateTrackDomain";


const TracksDomainsSettings = ({projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const [trackDomains, setTrackDomains] = useState(projectSettings?.trackDomains);
  const [createDomainModal, setCreateDomainModal] = useState(false);

  useEffect(() => setTrackDomains(projectSettings?.trackDomains), [projectSettings?.trackDomains]);


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
          />
        )}
      </List>
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
  projectSettings: state.projects.projectSettings,
})

export default connect(
  getState,
  null,
)(TracksDomainsSettings);
