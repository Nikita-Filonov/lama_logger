import React from "react";
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import moment from "moment";
import {Delete} from "@mui/icons-material";
import {connect} from "react-redux";
import {setConfirmAction} from "../../../Redux/Users/usersActions";
import {useApiTokens} from "../../../Providers/Users/ApiTokensProvider";

const ApiToken = ({token, setConfirmAction}) => {
  const {deleteToken} = useApiTokens();

  const onDelete = () => {
    setConfirmAction({
      modal: true,
      title: 'Delete api token?',
      description: `Are you sure you want to delete "${token.name}" token? ` +
        "You will not able to restore it later and all integrations with " +
        "this token will no longer work",
      confirmButton: 'Delete',
      action: async () => await deleteToken(token.id)
    })
  }

  return (
    <ListItem divider>
      <ListItemText
        primary={token.name}
        secondary={moment(token.created).fromNow()}
      />
      <ListItemSecondaryAction>
        <IconButton size={'small'} onClick={onDelete}>
          <Delete/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default connect(
  null,
  {
    setConfirmAction
  },
)(ApiToken);
