import React, {useState} from "react";
import {Container, CssBaseline, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Link from "@mui/material/Link";
import {Link as RouterLink, useHistory} from "react-router-dom";
import {useUsers} from "../../Providers/UsersProvider";
import {baseUrl} from "../../Utils/Constants";
import {LoadingButton} from "@mui/lab";

export const Registration = () => {
  const history = useHistory();
  const {onLogin} = useUsers();
  const [request, setRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordSecure1, setPasswordSecure1] = useState('password');
  const [passwordSecure2, setPasswordSecure2] = useState('password')
  const [errors, setErrors] = useState({})

  const onShowPassword1 = () => setPasswordSecure1(passwordSecure1 === 'password' ? 'text' : 'password');
  const onShowPassword2 = () => setPasswordSecure2(passwordSecure2 === 'password' ? 'text' : 'password');

  const onRegistration = async () => {
    setRequest(true)
    const response = await fetch(baseUrl + 'api/v1/registration/', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({username, email, password, password2})
    })
    const json = await response.json();
    if (response.ok) {
      await onLogin(json.token)
      history.push('/projects')
    } else {
      setErrors(json)
    }
    setRequest(false)
  }

  return (
    <Container maxWidth={'sm'}>
      <CssBaseline/>
      <div className={'text-center'} style={{marginTop: '10%'}}>
        <Typography variant={'h5'}>Lama Logger</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          <TextField
            type={'email'}
            value={email}
            onChange={event => setEmail(event.target.value)}
            fullWidth
            label="E-mail"
            placeholder={'some@company.com'}
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.email}
            helperText={errors?.email?.join('\n')}
          />
          <TextField
            type={'text'}
            value={username}
            onChange={event => setUsername(event.target.value)}
            fullWidth
            label="Username"
            placeholder={'Family.Name'}
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.username}
            helperText={errors?.username?.join('\n')}
          />
          <TextField
            type={passwordSecure1}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
            label="Password"
            placeholder={'Enter your password'}
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.password}
            helperText={errors?.password?.join('\n')}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton size={'small'} onClick={onShowPassword1}>
                  {passwordSecure1 === 'password' ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>,
            }}
          />
          <TextField
            type={passwordSecure2}
            value={password2}
            onChange={event => setPassword2(event.target.value)}
            fullWidth
            label="Confirm password"
            placeholder={'Confirm your password'}
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.password2}
            helperText={errors?.password2?.join('\n')}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton size={'small'} onClick={onShowPassword2}>
                  {passwordSecure2 === 'password' ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>,
            }}
          />
          <div className={'mt-2 d-flex'}>
            <Link underline="none" component={RouterLink} to={'/login'}>Sign in</Link>
            <div className={'flex-grow-1'}/>
          </div>
          <LoadingButton loading={request} className={'mt-4'} variant="outlined" fullWidth onClick={onRegistration}>
            Sign up
          </LoadingButton>
        </Grid>
        <Grid item xs={2}/>
      </Grid>
    </Container>
  )
}
