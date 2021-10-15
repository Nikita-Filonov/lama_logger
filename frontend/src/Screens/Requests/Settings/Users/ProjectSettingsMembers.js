import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import MembersTable from "../../../../Components/Blocks/Requests/Settings/Users/Members/MembersTable";
import InviteMember from "../../../../Components/Modals/Requests/Settings/Users/InviteMember";
import {connect} from "react-redux";
import {setInviteMemberModal} from "../../../../Redux/Projects/projectActions";
import {MembersHeader} from "../../../../Components/Blocks/Requests/Settings/Users/Members/MembersHeader";
import MembersToolbar from "../../../../Components/Blocks/Requests/Settings/Users/Members/MembersToolbar";

const ProjectSettingsMembers = ({setInviteMemberModal, selectedMembers}) => {
  const classes = ProjectSettingsStyles();
  const onInvite = () => setInviteMemberModal(true)

  return (
    <div className={classes.contentContainer}>
      {selectedMembers.length > 0 ? <MembersToolbar/> : <MembersHeader/>}
      <MembersTable/>
      <ZoomFab action={onInvite} title={'Invite'}/>
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
