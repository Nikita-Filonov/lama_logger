import React, {useState} from "react";
import {ProjectSettingsHeader} from "../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, List, Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../Styles/Screens";
import {ZoomFab} from "../../Components/Blocks/Common/ZoomFab";
import {CreateToken} from "../../Components/Modals/Profile/CreateToken";
import {connect} from "react-redux";
import {useApiTokens} from "../../Providers/Users/ApiTokensProvider";
import ApiToken from "../../Components/Items/Profile/ApiToken";
import {ApiTokensSkeletons} from "../../Components/Blocks/Profile/ApiTokens/ApiTokensSkeletons";

export const ApiTokens = () => {
  const classes = ProjectSettingsStyles();
  const {load, tokens} = useApiTokens();
  const [createTokenModal, setCreateTokenModal] = useState(false);

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'API Tokens'}/>
      <Typography variant={'body2'} className={'mt-3'}>
        API tokens can be used for integrations and creating requests. Make sure to save your token some where,
        because you will not be able to view it again.
      </Typography>
      <Grid item xs={12} className={'mt-3'}>
        {load
          ? <ApiTokensSkeletons/>
          : <List dense>
            {tokens.map(t => <ApiToken key={t.id} token={t}/>)}
          </List>
        }
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
