import React, {useState} from "react";
import {ProjectSettingsHeader} from "../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {Grid, Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../Styles/Screens";
import {ZoomFab} from "../../Components/Blocks/Common/ZoomFab";
import {CreateToken} from "../../Components/Modals/Profile/CreateToken";

export const ApiTokens = () => {
  const classes = ProjectSettingsStyles();
  const [createTokenModal, setCreateTokenModal] = useState(false);

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'API Tokens'}/>
      <Typography variant={'body2'} className={'mt-3'}>
        API tokens can be used for integrations and creating requests. Make sure to save your token some where,
        because you will not be able to view it again.
      </Typography>
      <Grid item xs={12} className={'mt-3'}>

      </Grid>
      <Grid item xs={12} className={'mt-3'}>

      </Grid>
      <ZoomFab title={'NEW TOKEN'} action={() => setCreateTokenModal(true)}/>
      <CreateToken modal={createTokenModal} setModal={setCreateTokenModal}/>
    </div>
  )
}
