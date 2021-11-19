import React from "react";
import {Card, CardActions, CardContent, CardHeader, Grid, IconButton, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {GitHub} from "@mui/icons-material";
import {SdkLangStyles} from "../../../Styles/Items";
import {useHistory} from "react-router-dom";

export const SdkLang = ({lang}) => {
  const history = useHistory();

  const onView = () => history.push(`/integrations/${lang.language}`);
  const onGitHub = () => window.open(lang?.github, '_blank');

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader title={<Typography variant={'subtitle2'}>{lang.label}</Typography>}/>
        <CardContent className={'d-flex'}>
          <img src={lang.image} style={SdkLangStyles.imageContainer}/>
        </CardContent>
        <CardActions className={'d-flex'}>
          <Button size="small" onClick={onView}>View code</Button>
          <div className={'flex-grow-1'}/>
          <Tooltip title={'View on GitHub'} arrow>
            <IconButton onClick={onGitHub}>
              <GitHub/>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  )
}
