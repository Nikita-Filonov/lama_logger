import React, {memo, useCallback} from "react";
import {IconButton, Tab, Typography} from "@mui/material";
import {common, tabsStyles} from "../../../../Styles/Blocks";
import {Close} from "@mui/icons-material";
import {METHOD_COLORS} from "../../../../Utils/Constants";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {useCustomRequests} from "../../../../Providers/Requests/CustomRequestsPorvider";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";


const CustomRequestTab = ({project, request, index, setCustomRequest, setConfirmAction}) => {
  const {deleteCustomRequest} = useCustomRequests();

  const onSelectTab = useCallback(async () => setCustomRequest(request), [request]);
  const onDelete = useCallback(async () => {
    setConfirmAction({
      modal: true,
      title: 'Delete request?',
      description: 'Are you sure you want to delete the request? You will not be able to restore it',
      confirmButton: 'Delete',
      action: async () => await deleteCustomRequest(project.id, request.requestId)
    })
  }, [project.id, request.requestId])

  return (
    <Tab
      onClick={onSelectTab}
      value={index}
      sx={{...tabsStyles, pr: 0.5, pl: 1}}
      style={{flexDirection: 'row'}}
      component={'div'}
      label={
        <React.Fragment>
          <Typography
            variant={'body2'}
            sx={{mr: 1.5}}
            color={METHOD_COLORS[request?.method]}
          >
            {request?.method}
          </Typography>
          <Typography variant={'body2'} style={common.ellipsisText}>
            {request?.requestUrl ? request?.requestUrl : 'No url'}
          </Typography>
          <IconButton size={'small'} onClick={onDelete}>
            <Close fontSize={'small'}/>
          </IconButton>
        </React.Fragment>
      }
    />
  )
}

const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  {
    setCustomRequest,
    setConfirmAction
  },
)(memo(CustomRequestTab));
