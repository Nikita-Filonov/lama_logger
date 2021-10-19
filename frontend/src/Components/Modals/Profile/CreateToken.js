import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {common} from "../../../Styles/Blocks";
import {SlideTransition, uuid4} from "../../../Utils/Untils/Common";
import {useApiTokens} from "../../../Providers/Users/ApiTokensProvider";
import {LoadingButton} from "@mui/lab";
import {useAlerts} from "../../../Providers/AlertsProvider";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {ApiTokenReadyModal} from "../../Blocks/Profile/ApiTokens/ApiTokenReadyModal";

export const CreateToken = ({modal, setModal}) => {
  const {setAlert} = useAlerts();
  const {request, createToken} = useApiTokens();
  const [name, setName] = useState('');
  const [token, setToken] = useState(null);

  const onClose = () => {
    setModal(false);
    setToken(null);
  };

  const onCreate = async () => {
    const uuidToken = await uuid4();
    createToken({name, token: uuidToken})
      .then(() => {
        setToken(uuidToken);
        setName('')
      })
  }

  const onCopy = () => setAlert({message: 'Token copied to clipboard', level: 'success'})

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={token ? 'md' : 'xs'}
        open={modal}
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
          {token
            ? <ApiTokenReadyModal token={token} onCopy={onCopy}/>
            : <TextField
              value={name}
              onChange={event => setName(event.target.value)}
              fullWidth
              size={'small'}
              label={'Token name'}
              placeholder={'TokenName'}
              className={'mt-3'}
              variant={'standard'}
              inputProps={{maxLength: 255}}
            />
          }
        </DialogContent>
        <DialogActions>
          {token
            ? <CopyToClipboard text={token} onCopy={onCopy}>
              <Button onClick={onClose} color="primary">Copy and close</Button>
            </CopyToClipboard>
            : <React.Fragment>
              <Button onClick={onClose} color="primary">Cancel</Button>
              <LoadingButton
                color="primary"
                loading={request}
                disabled={name.length === 0}
                onClick={onCreate}
              >
                Create
              </LoadingButton>
            </React.Fragment>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
