import React, {useState} from "react";
import {useUsers} from "../../Providers/UsersProvider";
import {baseUrl} from "../../Utils/Constants";
import {useHistory} from 'react-router-dom'
import {Button, Container, Grid, TextField} from "@material-ui/core";


export const Login = () => {
  const history = useHistory()
  const {onLogin} = useUsers()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const onLoginPress = async () => {
    await fetch(baseUrl + 'api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(response => response.json())
      .then(async data => {
        if (data?.token) {
          await onLogin(data.token)
          history.push('/')
        } else {
          setErrors(data)
        }
      });
  };

  return (
    <Container maxWidth="sm">>

      <div className={'text-center'} style={{marginTop: '20%'}}>
        <h4>Lama Logger</h4>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          <TextField
            value={username}
            onChange={event => setUsername(event.target.value)}
            fullWidth
            label="E-mail"
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.username}
            helperText={errors?.username}
          />
          <TextField
            type={'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
            label="Password"
            variant="standard"
            size={'small'}
            className={'mt-3'}
            error={errors?.password}
            helperText={errors?.password}
          />
          <Button className={'mt-4'} variant="outlined" fullWidth onClick={onLoginPress}>
            Log in
          </Button>
        </Grid>
        <Grid item xs={2}/>
      </Grid>

    </Container>
  )
}
