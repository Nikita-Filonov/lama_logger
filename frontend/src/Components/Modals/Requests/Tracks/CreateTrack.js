import React, {useState} from "react";
import {
  AppBar,
  Autocomplete,
  Checkbox,
  Container,
  Dialog,
  DialogContentText,
  FormHelperText,
  IconButton,
  InputLabel,
  Link,
  Select,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {Link as RouterLink} from 'react-router-dom';
import {connect} from "react-redux";
import {baseUrl, REQUESTS_STATUS_CODES_FILTERS} from "../../../../Utils/Constants";
import {StatusCodeIndicator} from "../../../Blocks/Requests/Requests/StatusCodeIndicator";
import {LoadingButton} from "@mui/lab";
import {useTracks} from "../../../../Providers/Requests/Tracks/TracksProvider";
import {setCreateTrackModal} from "../../../../Redux/Requests/Tracks/tracksActions";
import {SlideTransition} from "../../../../Utils/Utils/Common";


const CreateTrack = ({createTrackModal, setCreateTrackModal, project, service}) => {
  const {request, createTrack} = useTracks();
  const [endpoint, setEndpoint] = useState('');
  const [times, setTimes] = useState(1);
  const [statusCodes, setStatusCodes] = useState([]);
  const [responseBodyContains, setResponseBodyContains] = useState('');

  const onClose = () => setCreateTrackModal(false);
  const onCreate = async () => createTrack(project?.id, service?.id,
    {endpoint, times, statusCodes, responseBodyContains})
    .then(() => onClose());

  return (
    <Dialog
      fullScreen
      open={createTrackModal}
      onClose={onClose}
      TransitionComponent={SlideTransition}
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
            Create new track for {service?.title}
          </Typography>
          <LoadingButton color={'inherit'} onClick={onCreate} loading={request}>
            Create
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Container className={'mt-5'}>
        <DialogContentText>
          You can create track for certain endpoint. When error will happen on this
          endpoint we will let you know about it.
        </DialogContentText>
        <TextField
          value={endpoint}
          onChange={event => setEndpoint(event.target.value)}
          className={'mt-3'}
          variant={'standard'}
          size={'small'}
          fullWidth
          label={'Endpoint'}
          placeholder={'https://some.unstable.endpoint.com/api/v1/'}
        />
        <TextField
          value={times}
          onChange={event => setTimes(event.target.value)}
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
        <Autocomplete
          value={statusCodes}
          size={'small'}
          multiple
          freeSolo
          options={Object.values(REQUESTS_STATUS_CODES_FILTERS).flat()}
          onChange={(_, value) => setStatusCodes(value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option.toString()}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox size={'small'} style={{marginRight: 8}} checked={selected}/>
              {option}
              <div className={'flex-grow-1'}/>
              <StatusCodeIndicator statusCode={option}/>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              className={'mt-3'}
              label={'What status code do we take for an error?'}
              placeholder={'401, 500, 502'}
              size={'small'}
              variant={'standard'}
              helperText={'List of status codes. Press "Enter" to add'}
            />
          )}
        />
        <TextField
          value={responseBodyContains}
          onChange={event => setResponseBodyContains(event.target.value)}
          multiline
          className={'mt-3'}
          variant={'standard'}
          size={'small'}
          fullWidth
          label={'What response body should contains?'}
          placeholder={'{"error": "some error"}'}
          helperText={'Enter pattern which 3'}
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
  service: state.tracks.service,
  createTrackModal: state.tracks.createTrackModal
})

export default connect(
  getState,
  {
    setCreateTrackModal
  },
)(CreateTrack);
