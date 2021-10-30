import React, {memo, useState} from "react";
import {List, Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ProjectSettingsHeader} from "../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {ZoomFab} from "../../../Components/Blocks/Common/ZoomFab";
import CreatePeriodicTask from "../../../Components/Modals/Requests/Settings/PeriodicTasks/CreatePeriodicTask";
import {useProjectTasks} from "../../../Providers/Requests/ProjectTasksProvider";
import {PeriodicTask} from "../../../Components/Items/Reuqests/Settings/PeriodicTasks/PeriodicTask";
import {ApiTokensSkeletons} from "../../../Components/Blocks/Profile/ApiTokens/ApiTokensSkeletons";


const PeriodicTasksSettings = () => {
  const classes = ProjectSettingsStyles();
  const {load, tasks} = useProjectTasks();
  const [createPeriodicTaskModal, setCreatePeriodicTaskModal] = useState(false);


  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Setup periodic tasks'}/>
      <Typography variant={'body1'} className={'mt-3'}>
        Here you can setup periodic task
      </Typography>
      {load
        ? <ApiTokensSkeletons/>
        : <List dense>
          {tasks.map(task => <PeriodicTask key={task.id} task={task}/>)}
        </List>
      }
      <ZoomFab title={'New task'} action={() => setCreatePeriodicTaskModal(true)}/>
      <CreatePeriodicTask modal={createPeriodicTaskModal} setModal={setCreatePeriodicTaskModal}/>
    </div>
  )
}

export default memo(PeriodicTasksSettings);
