import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {RolesHeader} from "../../../../Components/Blocks/Projects/Settings/Users/Roles/RolesHeader";
import RolesTable from "../../../../Components/Blocks/Projects/Settings/Users/Roles/RolesTable";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateRole from "../../../../Components/Modals/Projects/Settings/Users/Roles/CreateRole";
import {setCreateRoleModal} from "../../../../Redux/Projects/projectActions";
import {connect} from "react-redux";

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
