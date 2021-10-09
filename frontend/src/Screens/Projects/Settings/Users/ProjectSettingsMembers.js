import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import Typography from "@mui/material/Typography";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import MembersTable from "../../../../Components/Blocks/Projects/Settings/Users/MembersTable";
import InviteMember from "../../../../Components/Modals/Projects/Settings/Users/InviteMember";
import {connect} from "react-redux";
import {setInviteMemberModal} from "../../../../Redux/Projects/projectActions";
import {TextField} from "@mui/material";

const ProjectSettingsMembers = ({setInviteMemberModal}) => {

  const classes = ProjectSettingsStyles();

  const onInvite = () => setInviteMemberModal(true)

  return (
    <div className={classes.contentContainer}>
      <div className={'d-flex justify-content-center align-items-center'}>
        <Typography variant="subtitle1" gutterBottom>Project members</Typography>
        <div className={'flex-grow-1'}/>
        <TextField
          className={'w-25'}
          variant={'standard'}
          label={'Search'}
          placeholder={'Search by username, email, role'}
        />
      </div>
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
