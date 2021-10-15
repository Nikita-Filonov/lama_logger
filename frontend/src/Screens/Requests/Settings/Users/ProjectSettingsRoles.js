import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {RolesHeader} from "../../../../Components/Blocks/Requests/Settings/Users/Roles/RolesHeader";
import RolesTable from "../../../../Components/Blocks/Requests/Settings/Users/Roles/RolesTable";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateRole from "../../../../Components/Modals/Requests/Settings/Users/Roles/CreateRole";
import {connect} from "react-redux";
import {setCreateRoleModal} from "../../../../Redux/Requests/Settings/requestsSettingsActions";

const ProjectSettingsRoles = ({setCreateRoleModal}) => {
  const classes = ProjectSettingsStyles();
  const onCreate = () => setCreateRoleModal(true)

  return (
    <div className={classes.contentContainer}>
      <RolesHeader/>
      <RolesTable/>
      <ZoomFab action={onCreate} title={'Create'}/>
      <CreateRole/>
    </div>
  )
}

export default connect(
  null,
  {
    setCreateRoleModal
  },
)(ProjectSettingsRoles);
