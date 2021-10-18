import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField
} from '@mui/material';
import {common} from "../../../Styles/Blocks";
import {SlideTransition, uuid4} from "../../../Utils/Untils/Common";
import {useApiTokens} from "../../../Providers/Users/ApiTokensProvider";
import {LoadingButton} from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import {ContentCopy} from "@mui/icons-material";
import {useAlerts} from "../../../Providers/AlertsProvider";
import {CopyToClipboard} from "react-copy-to-clipboard";

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
        maxWidth={'xs'}
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
            ? <TextField
              value={token}
              fullWidth
              size={'small'}
              label={'Your token'}
              className={'mt-3'}
              variant={'standard'}
              helperText={'Copy your token'}
              InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position="end">
                  <CopyToClipboard text={token} onCopy={onCopy}>
                    <IconButton size={'small'}>
                      <ContentCopy fontSize={'small'}/>
                    </IconButton>
                  </CopyToClipboard>
                </InputAdornment>,
              }}
            />
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
