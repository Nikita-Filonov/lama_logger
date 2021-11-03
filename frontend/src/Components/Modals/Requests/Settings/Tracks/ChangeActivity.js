import React from "react";
import {SlideTransition} from "../../../../../Utils/Utils/Common";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {connect} from "react-redux";
import {useServices} from "../../../../../Providers/Requests/Tracks/ServicesProvider";
import {setActivity, setChangeActivityModal} from "../../../../../Redux/Requests/Tracks/tracksActions";
import {ACTIVITY} from "../../../../../Utils/Permissions/Tracks";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";

const ChangeActivity = (props) => {
  const {project, activity, setActivity, changeActivityModal, setChangeActivityModal} = props;
  const {isAllowed} = usePermissions();
  const {request, updateActivity} = useServices();

  const onClose = () => setChangeActivityModal(false);

  const onUpdate = async () => updateActivity(project.id, activity.id, {title: activity.title})
    .then(() => onClose());

  return (
    <Dialog
      open={changeActivityModal}
      onClose={onClose}
      fullWidth
      maxWidth={'sm'}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>Change activity</DialogTitle>
      <DialogContent>
        <TextField
          value={activity.title}
          onChange={event => setActivity({...activity, title: event.target.value})}
          autoFocus
          margin="dense"
          label="Title"
          placeholder={'Users frontend'}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          onClick={onUpdate}
          disabled={!isAllowed([ACTIVITY.update])}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  activity: state.tracks.activity,
  changeActivityModal: state.tracks.changeActivityModal
})

export default connect(
  getState,
  {
    setActivity,
    setChangeActivityModal
  },
)(ChangeActivity);
