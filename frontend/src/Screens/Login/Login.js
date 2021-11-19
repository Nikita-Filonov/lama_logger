import React, {useState} from "react";
import {useUsers} from "../../Providers/Users/UsersProvider";
import {Link as RouterLink, useHistory} from 'react-router-dom'
import {Alert, Container, CssBaseline, Grid, InputAdornment, TextField, Typography} from '@mui/material';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Link from "@mui/material/Link";
import {post} from "../../Utils/Api/Fetch";
import _ from 'lodash';


export const Login = () => {
  const history = useHistory();
  const {onLogin} = useUsers();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState('password');
  const [errors, setErrors] = useState({})

  const onShowPassword = () => setPasswordSecure(passwordSecure === 'password' ? 'text' : 'password')
  const onLoginPress = async () => {
    const {json, error} = await post('api/v1/login/', {email, password}, false);
    error && setErrors(json);

    if (!error && json?.token) {
      await onLogin(json.token);
      history.push('/projects');
    }
  };

  return (
    <Container maxWidth={'sm'}>
      <CssBaseline/>
      <div className={'text-center'} style={{marginTop: '20%'}}>
        <Typography variant={'h5'}>Lama Logger</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          {!_.isEmpty(errors) && <Alert severity={errors?.level || 'error'} sx={{mt: 1}}>
            {errors?.message}
          </Alert>}
          <TextField
            value={email}
            onChange={event => setEmail(event.target.value)}
            fullWidth
            label="E-mail"
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.username}
            helperText={errors?.username}
          />
          <TextField
            type={passwordSecure}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
            label="Password"
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.password}
            helperText={errors?.password}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton size={'small'} onClick={onShowPassword}>
                  {passwordSecure === 'password' ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>,
            }}
          />
          <div className={'mt-2 d-flex'}>
            <Link underline="none" component={RouterLink} to={'/registration'}>Sign up</Link>
            <div className={'flex-grow-1'}/>
            <Link underline="none" component={RouterLink} to={'/registration'}>Forgot password?</Link>
          </div>
          <Button className={'mt-4'} variant="outlined" fullWidth onClick={onLoginPress}>
            Sign in
          </Button>
        </Grid>
        <Grid item xs={2}/>
      </Grid>
    </Container>
  )
}
