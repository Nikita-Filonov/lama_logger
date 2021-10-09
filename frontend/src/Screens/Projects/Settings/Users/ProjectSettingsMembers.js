import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import MembersTable from "../../../../Components/Blocks/Projects/Settings/Users/MembersTable";
import InviteMember from "../../../../Components/Modals/Projects/Settings/Users/InviteMember";
import {connect} from "react-redux";
import {setInviteMemberModal} from "../../../../Redux/Projects/projectActions";
import {MembersHeader} from "../../../../Components/Blocks/Projects/Settings/Users/MembersHeader";
import MembersToolbar from "../../../../Components/Blocks/Projects/Settings/Users/MembersToolbar";

const ProjectSettingsMembers = ({setInviteMemberModal, selectedMembers}) => {
  const classes = ProjectSettingsStyles();
  const onInvite = () => setInviteMemberModal(true)

  return (
    <div className={classes.contentContainer}>
      {selectedMembers.length > 0 ? <MembersToolbar/> : <MembersHeader/>}
      <MembersTable/>
      <ZoomFab action={onInvite}/>
      <InviteMember/>
    </div>
  )
}

const getState = (state) => ({
  selectedMembers: state.projects.selectedMembers
})

export default connect(
  getState,
  {
    setInviteMemberModal
  },
)(ProjectSettingsMembers);
