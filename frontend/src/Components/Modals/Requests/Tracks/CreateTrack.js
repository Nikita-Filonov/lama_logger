import React, {forwardRef} from "react";
import {
  AppBar, Avatar,
  Button,
  Container,
  Dialog,
  DialogContentText,
  FormHelperText,
  IconButton,
  InputLabel,
  Link,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {Link as RouterLink} from 'react-router-dom';
import {connect} from "react-redux";
import {baseUrl} from "../../../../Utils/Constants";

const Transition = forwardRef((props, ref) =>
  <Slide direction="up" ref={ref} {...props} />);


const CreateTrack = ({modal, setModal, project}) => {

  const onClose = () => setModal(false);

  return (
    <Dialog
      fullScreen
      open={modal}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{position: 'relative'}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon/>
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
            Create new track
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Create
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={'mt-3'}>
        <DialogContentText>
          You can create track for certain endpoint. When error will happen on this
          endpoint we will let you know about it.
        </DialogContentText>
        <TextField
          className={'mt-3'}
          variant={'standard'}
          size={'small'}
          fullWidth
          label={'Endpoint'}
          placeholder={'https://some.unstable.endpoint.com/api/v1/'}
        />
        <TextField
          type={'number'}
          className={'mt-3'}
          variant={'standard'}
          size={'small'}
          fullWidth
          label={'How many times error should happen?'}
          placeholder={'100'}
          helperText={
            'This option used to not spam your email/channel. ' +
            'For example if error happened 5 times, we will notify you.'
          }
        />
        <TextField
          className={'mt-3'}
          variant={'standard'}
          size={'small'}
          fullWidth
          label={'What status code do we take for an error?'}
          placeholder={'401, 500, 502'}
          helperText={'List of status codes. Press "Enter" to add'}
        />
        <FormControl variant="standard" className={'mt-3'} fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Where to notify you?</InputLabel>
          <Select>
            <MenuItem value={10} style={{alignItems: 'center'}}>
              <img style={{width: 25, height: 25, marginRight: 10}}
                   src={baseUrl + 'static/images/integrations/slack.png'}/>
              Slack
            </MenuItem>
          </Select>
          <FormHelperText>
            If you have empty list of notify integrations, go to{' '}
            {<Link component={RouterLink} to={`/projects/${project.id}/settings/integrations`}>Integrations</Link>}{' '}
            section to setup one.
          </FormHelperText>
        </FormControl>
      </Container>
    </Dialog>
  )
}

const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(CreateTrack);
