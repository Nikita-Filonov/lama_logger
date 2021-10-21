import React, {useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import RolesTable from "../../../../Components/Blocks/Requests/Settings/Users/Roles/RolesTable";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateRole from "../../../../Components/Modals/Requests/Settings/Users/Roles/CreateRole";
import {connect} from "react-redux";
import {setCreateRoleModal} from "../../../../Redux/Requests/Settings/requestsSettingsActions";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import RolesToolbar from "../../../../Components/Blocks/Requests/Settings/Users/Roles/RolesToolbar";

const ProjectSettingsRoles = ({selectedRoles, setCreateRoleModal}) => {
  const classes = ProjectSettingsStyles();
  const onCreate = () => setCreateRoleModal(true);
  const [search, setSearch] = useState('')

  return (
    <div className={classes.contentContainer}>
      {selectedRoles.length > 0
        ? <RolesToolbar/>
        : <ProjectSettingsHeader
          title={'Project roles'}
          search={search}
          setSearch={setSearch}
          placeholder={'Search by name'}
        />
      }

      <div className={'mt-3'}>
        <RolesTable/>
      </div>
      <ZoomFab action={onCreate} title={'Create'}/>
      <CreateRole/>
    </div>
  )
}

const getState = (state) => ({
  selectedRoles: state.requestsSettings.selectedRoles
})

export default connect(
  getState,
  {
    setCreateRoleModal
  },
)(ProjectSettingsRoles);
