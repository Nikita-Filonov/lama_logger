import React from "react";
import {Button, Container, CssBaseline, Divider, Typography} from "@mui/material";
import {baseUrl} from "../Utils/Constants";
import {useHistory} from "react-router-dom";

export const NotFound = () => {
  const history = useHistory();

  const onGoHome = () => history.push('/projects')

  return (
    <Container>
      <CssBaseline/>
      <Typography textAlign={'center'} variant={'h4'} sx={{mt: 4}}>Page not found</Typography>
      <Divider sx={{mt: 2}}/>
      <div className={'d-flex justify-content-center mt-2'}>
        <img alt={'logo'} src={baseUrl + 'static/images/logo.png'} style={{width: 200, height: 200}}/>
      </div>
      <Typography textAlign={'center'} variant={'h6'} sx={{mt: 4}}>
        Unable to find requested resource, make sure to use correct url
      </Typography>
      <div className={'d-flex justify-content-center mt-4'}>
        <Button onClick={onGoHome}>
          Go to home page
        </Button>
      </div>
    </Container>
  )
}
