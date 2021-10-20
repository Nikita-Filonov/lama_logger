import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";


const RequestsFiltersSettings = ({project, projectSettings}) => {
  const classes = ProjectSettingsStyles();


  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Requests filters'}/>


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
