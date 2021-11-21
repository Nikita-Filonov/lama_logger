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
import {EmptyList} from "../../Components/Blocks/Common/EmptyList";

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
        {tokens?.length === 0 && !load && <EmptyList
          text={'There is not API Tokens'} description={'Click on "New token" to create new one'}/>}
        {load
          ? <ApiTokensSkeletons/>
          : <List dense>
            {tokens.map(token => <ApiToken key={token.id} token={token}/>)}
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
