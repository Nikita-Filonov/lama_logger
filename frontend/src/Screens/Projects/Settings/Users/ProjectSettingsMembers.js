import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import Typography from "@mui/material/Typography";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import MembersTable from "../../../../Components/Blocks/Projects/Settings/Users/MembersTable";

export const ProjectSettingsMembers = () => {

  const classes = ProjectSettingsStyles();


  return (
    <div className={classes.contentContainer}>
      <Typography variant="subtitle1" gutterBottom>Project members</Typography>
      <MembersTable/>
      <ZoomFab/>
    </div>
  )
}
