import React, {useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {RolesHeader} from "../../../../Components/Blocks/Projects/Settings/Users/Roles/RolesHeader";
import RolesTable from "../../../../Components/Blocks/Projects/Settings/Users/Roles/RolesTable";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateRole from "../../../../Components/Modals/Projects/Settings/Users/Roles/CreateRole";

export const ProjectSettingsRoles = () => {
  const classes = ProjectSettingsStyles();
  const [createRoleModal, setCreateRoleModal] = useState(false);

  const onCreate = () => setCreateRoleModal(true)

  return (
    <div className={classes.contentContainer}>
      <RolesHeader/>
      <RolesTable/>
      <ZoomFab action={onCreate} title={'Create'}/>
      <CreateRole modal={createRoleModal} setModal={setCreateRoleModal}/>
    </div>
  )
}
