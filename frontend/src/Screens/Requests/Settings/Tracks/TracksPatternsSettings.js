import React, {useEffect, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, Typography} from "@mui/material";
import {moveActivity} from "../../../../Redux/Requests/Tracks/tracksActions";
import {TrackPattern} from "../../../../Components/Items/Reuqests/Settings/Tracks/TrackPattern";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateTrackPattern from "../../../../Components/Modals/Requests/Settings/Tracks/CreateTrackPattern";


const TracksPatternsSettings = ({projectSettings, project, moveActivity}) => {
  const classes = ProjectSettingsStyles();
  const [trackPatterns, setTrackPatterns] = useState(projectSettings?.trackPatterns);
  const [createPatternModal, setCreateTrackModal] = useState(false);

  useEffect(() => setTrackPatterns(projectSettings?.trackPatterns), [projectSettings?.trackPatterns])

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Tracks patterns'}/>
      <Typography variant={'body1'} className={'mt-3'}>
        Here you can setup any patterns to match tracks endpoints.
      </Typography>
      <Grid container xs={12} className={'mt-3'} spacing={2}>
        <Grid item xs={6}>
          <Typography>Pattern</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Regex expression</Typography>
        </Grid>
      </Grid>
      {trackPatterns?.map((pattern, index) => <TrackPattern key={index} pattern={pattern}/>)}
      <ZoomFab title={'New pattern'} action={() => setCreateTrackModal(true)}/>
      <CreateTrackPattern
        modal={createPatternModal}
        setModal={setCreateTrackModal}
        trackPatterns={trackPatterns}
      />
    </div>
  )
}


const getState = (state) => ({
  activities: state.tracks.activities,
  projectSettings: state.projects.projectSettings,
})

export default connect(
  getState,
  {
    moveActivity
  },
)(TracksPatternsSettings);
