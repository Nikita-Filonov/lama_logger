import React, {useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import MembersTable from "../../../../Components/Blocks/Requests/Settings/Users/Members/MembersTable";
import InviteMember from "../../../../Components/Modals/Requests/Settings/Users/InviteMember";
import {connect} from "react-redux";
import {setInviteMemberModal} from "../../../../Redux/Requests/Settings/requestsSettingsActions";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import MembersToolbar from "../../../../Components/Blocks/Requests/Settings/Users/Members/MembersToolbar";

const ProjectSettingsMembers = ({setInviteMemberModal, selectedMembers}) => {
  const classes = ProjectSettingsStyles();
  const [search, setSearch] = useState('')

  const onInvite = () => setInviteMemberModal(true)

  return (
    <div className={classes.contentContainer}>
      {selectedMembers.length > 0
        ? <MembersToolbar/>
        : <ProjectSettingsHeader
          title={'Project members'}
          search={search}
          setSearch={setSearch}
          placeholder={'Search by username, email'}
        />
      }
      <div className={'mt-3'}>
        <MembersTable/>
      </div>
      <ZoomFab action={onInvite} title={'Invite'}/>
      <InviteMember/>
    </div>
  )
}

const getState = (state) => ({
  selectedMembers: state.requestsSettings.selectedMembers
})

export default connect(
  getState,
  {
    setInviteMemberModal
  },
)(ProjectSettingsMembers);
