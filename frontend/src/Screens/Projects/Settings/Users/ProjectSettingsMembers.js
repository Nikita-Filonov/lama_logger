import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import Typography from "@mui/material/Typography";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import MembersTable from "../../../../Components/Blocks/Projects/Settings/Users/MembersTable";
import InviteMember from "../../../../Components/Modals/Projects/Settings/Users/InviteMember";
import {connect} from "react-redux";
import {setInviteMemberModal} from "../../../../Redux/Projects/projectActions";

const ProjectSettingsMembers = ({setInviteMemberModal}) => {

  const classes = ProjectSettingsStyles();

  const onInvite = () => setInviteMemberModal(true)

  return (
    <div className={classes.contentContainer}>
      <Typography variant="subtitle1" gutterBottom>Project members</Typography>
      <MembersTable/>
      <ZoomFab action={onInvite}/>
      <InviteMember/>
    </div>
  )
}

export default connect(
  null,
  {
    setInviteMemberModal
  },
)(ProjectSettingsMembers);
