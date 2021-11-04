import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {connect} from "react-redux";
import {SlideTransition, validateHttp} from "../../../../../Utils/Utils/Common";
import {LoadingButton} from "@mui/lab";
import {useProjectSettings} from "../../../../../Providers/Requests/ProjectSettingsProvider";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {PROJECT_SETTINGS} from "../../../../../Utils/Permissions/Projects";


const CreateTrackDomain = ({project, modal, setModal, trackDomains}) => {
  const {isAllowed} = usePermissions();
  const {request, updateProjectSettings} = useProjectSettings();
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const onClose = () => setModal(false)

  const onCreate = async () => updateProjectSettings(project.id, {
    trackDomains: [...trackDomains, {name, domain}]
  }).then(() => {
    onClose();
    setDomain('');
    setName('');
  });

  return (
    <Dialog
      open={modal}
      onClose={onClose}
      fullWidth
      maxWidth={'sm'}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>Create domain</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create your own domain. Then you will be able to use it on track endpoints
        </DialogContentText>
        <TextField
          value={name}
          onChange={event => setName(event.target.value)}
          autoFocus
          margin="dense"
          label="Name"
          placeholder={'Staging/Prod/Dev'}
          fullWidth
          variant="standard"
          inputProps={{maxLength: 100}}
        />
        <TextField
          value={domain}
          onChange={event => setDomain(event.target.value)}
          autoFocus
          margin="dense"
          label="Domain"
          placeholder={'https://staging.domain.com'}
          fullWidth
          variant="standard"
          inputProps={{maxLength: 255}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          onClick={onCreate}
          disabled={
            name.length === 0 ||
            !validateHttp(domain) ||
            !isAllowed([PROJECT_SETTINGS.update])
          }
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  null,
)(CreateTrackDomain);
