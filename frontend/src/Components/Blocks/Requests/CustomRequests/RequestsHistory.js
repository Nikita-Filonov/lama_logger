import React from "react";
import {Grid, IconButton, List, ListItem, ListItemSecondaryAction, Paper, Typography} from "@mui/material";
import {MoreHoriz, MoreVert} from "@mui/icons-material";
import {connect} from "react-redux";
import {common} from "../../../../Styles/Blocks";
import {HeaderDivider} from "./HeaderDivider";
import {METHOD_COLORS} from "../../../../Utils/Constants";

const RequestsHistory = ({customRequests}) => {
  return (
    <Paper elevation={3} sx={{p: 1, pl: 1.5}}>
      <div className={'d-flex align-items-center'}>
        <Typography>History</Typography>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <MoreVert fontSize={'small'}/>
        </IconButton>
      </div>
      <HeaderDivider/>
      <List dense>
        {customRequests?.results?.map(request =>
          <ListItem key={request.requestId} divider disableGutters>
            <Grid container spacing={2}>
              <Grid item xs={2} md={2} lg={2} xl={2} sm={2}>
                <Typography color={METHOD_COLORS[request?.method]} sx={{mr: 2}}>{request?.method}</Typography>
              </Grid>
              <Grid item xs={10} md={10} lg={10} xl={10} sm={10}>
                <Typography style={common.ellipsisText}>{request?.requestUrl}</Typography>
              </Grid>
            </Grid>
            <ListItemSecondaryAction>
              <IconButton size={'small'}>
                <MoreHoriz fontSize={'small'}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </Paper>
  )
}

const getState = (state) => ({
  customRequests: state.customRequests.customRequests,
})

export default connect(
  getState,
  null,
)(RequestsHistory);
