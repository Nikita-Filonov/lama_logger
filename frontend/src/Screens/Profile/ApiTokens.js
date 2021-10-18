import React, {useState} from "react";
import {ProjectSettingsHeader} from "../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../Styles/Screens";
import {ZoomFab} from "../../Components/Blocks/Common/ZoomFab";
import {CreateToken} from "../../Components/Modals/Profile/CreateToken";
import {connect} from "react-redux";
import {Delete} from "@mui/icons-material";
import moment from "moment";
import {useApiTokens} from "../../Providers/Users/ApiTokensProvider";

export const ApiTokens = () => {
  const classes = ProjectSettingsStyles();
  const {tokens} = useApiTokens();
  const [createTokenModal, setCreateTokenModal] = useState(false);

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'API Tokens'}/>
      <Typography variant={'body2'} className={'mt-3'}>
        API tokens can be used for integrations and creating requests. Make sure to save your token some where,
        because you will not be able to view it again.
      </Typography>
      <Grid item xs={12} className={'mt-3'}>
        <List>
          {tokens.map(t =>
            <ListItem key={t.id} divider>
              <ListItemText
                primary={t.name}
                secondary={moment(t.created).fromNow()}
              />
              <ListItemSecondaryAction>
                <IconButton size={'small'}>
                  <Delete/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Grid>
      <ZoomFab title={'NEW TOKEN'} action={() => setCreateTokenModal(true)}/>
      <CreateToken modal={createTokenModal} setModal={setCreateTokenModal}/>
    </div>
  )
}

const getState = (state) => ({
  tokens: state.users.tokens
})

export default connect(
  getState,
  null,
)(ApiTokens);
