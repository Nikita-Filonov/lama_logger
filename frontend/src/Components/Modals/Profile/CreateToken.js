import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {common} from "../../../Styles/Blocks";
import {SlideTransition} from "../../../Utils/Untils/Common";

export const CreateToken = ({modal, setModal}) => {
  const onClose = () => setModal(false);

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={'xs'}
        open={modal}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        disableScrollLock={true}
        TransitionComponent={SlideTransition}
      >
        <DialogTitle id="form-dialog-title">New token</DialogTitle>
        <DialogContent>
          <DialogContentText className={common.breakText}>
            Make sure to save your token some where,
            because you will not be able to view it again.
          </DialogContentText>
          <TextField
            fullWidth
            size={'small'}
            label={'Token name'}
            placeholder={'For LL project'}
            className={'mt-3'}
            variant={'standard'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
