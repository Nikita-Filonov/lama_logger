import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, Typography} from "@mui/material";
import {TrackPattern} from "../../../../Components/Items/Reuqests/Settings/Tracks/TrackPattern";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateTrackPattern from "../../../../Components/Modals/Requests/Settings/Tracks/CreateTrackPattern";
import {useProjectSettings} from "../../../../Providers/Requests/ProjectSettingsProvider";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {SaveOutlined} from "@mui/icons-material";


const TracksPatternsSettings = ({projectSettings, project}) => {
  const classes = ProjectSettingsStyles();
  const {request, updateProjectSettings} = useProjectSettings();
  const [trackPatterns, setTrackPatterns] = useState(projectSettings?.trackPatterns);
  const [createPatternModal, setCreateTrackModal] = useState(false);

  const disabled = useMemo(() => trackPatterns === projectSettings?.trackPatterns, [trackPatterns])

  useEffect(() => setTrackPatterns(projectSettings?.trackPatterns), [projectSettings?.trackPatterns]);

  const onRemove = async (index) => {
    const copyTrackPatterns = [...trackPatterns];
    copyTrackPatterns.splice(index, 1);
    setTrackPatterns(copyTrackPatterns);
    await updateProjectSettings(project.id, {trackPatterns: copyTrackPatterns});
  }
  const onChange = async (type = 'pattern', index, value) =>
    setTrackPatterns(trackPatterns.map((p, i) => i === index ? {...p, [type]: value} : p));
  const onSave = async () => await updateProjectSettings(project.id, {trackPatterns});


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
      {trackPatterns?.map((pattern, index) =>
        <TrackPattern
          key={index}
          index={index}
          pattern={pattern}
          onChange={onChange}
          onRemove={onRemove}
        />
      )}
      <ZoomFab title={'New pattern'} action={() => setCreateTrackModal(true)}/>
      <CreateTrackPattern
        modal={createPatternModal}
        setModal={setCreateTrackModal}
        trackPatterns={trackPatterns}
      />
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <LoadingButton
            loadingPosition="start"
            startIcon={<SaveOutlined/>}
            disabled={disabled}
            variant="text"
            onClick={onSave}
            loading={request}
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
  projectSettings: state.projects.projectSettings,
})

export default connect(
  getState,
  null,
)(TracksPatternsSettings);
