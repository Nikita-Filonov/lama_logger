import React from "react";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ProjectSettingsHeader} from "../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";

export const CustomRequestsJsonEditorSettings = () => {
  const classes = ProjectSettingsStyles();


  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Json editor settings'}/>
    </div>
  )
}
