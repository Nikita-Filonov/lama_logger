import React, {useEffect, useMemo, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {ProjectSettingsHeader} from "../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {DeleteOutline, SaveOutlined} from "@mui/icons-material";
import {ProjectSettingsStyles} from "../../Styles/Screens";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/Users/UsersProvider";

const Profile = ({user}) => {
  const classes = ProjectSettingsStyles();
  const {request, updateUser} = useUsers();
  const [state, setState] = useState(user);

  useEffect(() => setState(user), [user]);
  const onChangeState = (name, e) => setState({...state, [name]: e.target.value});

  const disabled = useMemo(() => {
    if (state?.username !== user?.username) {
      return false;
    }

    return state?.email === user?.email;
  }, [state, user])

  const onSave = async () => await updateUser(state);

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Personal info'}/>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          value={state?.username}
          onChange={event => onChangeState('username', event)}
          label="Username"
          variant="standard"
          placeholder={'Family.Name'}
          className={'w-50'}
          inputProps={{maxLength: 255}}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <TextField
          value={state?.email}
          onChange={event => onChangeState('email', event)}
          label="Email"
          variant="standard"
          placeholder={'some@company.com'}
          className={'w-50'}
          inputProps={{maxLength: 255}}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <LoadingButton
            onClick={onSave}
            loading={request}
            loadingPosition="start"
            startIcon={<SaveOutlined/>}
            disabled={disabled}
            variant="text"
          >
            Save changes
          </LoadingButton>
        </Box>
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Button startIcon={<DeleteOutline/>} variant="text" style={{color: 'red'}}>Delete account</Button>
      </Grid>
    </div>
  )
}


const getState = (state) => ({
  user: state.users.user
})

export default connect(
  getState,
  null,
)(Profile);
