import React from "react";
import {Grid, IconButton, TextField} from "@mui/material";
import {Close, Language} from "@mui/icons-material";
import {setConfirmAction} from "../../../../../Redux/Users/usersActions";
import {connect} from "react-redux";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {PROJECT_SETTINGS} from "../../../../../Utils/Permissions/Projects";

const Domain = (props) => {
  const {domain, index, onChange, onRemove, setConfirmAction} = props;
  const {isAllowed} = usePermissions();

  const onRemovePress = () => {
    setConfirmAction({
      modal: true,
      title: 'Delete domain?',
      description: 'Are you sure you want to delete the domain? You will not be able to restore it later',
      confirmButton: 'Delete',
      action: async () => await onRemove(index)
    })
  }

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={4}>
        <div className={'d-flex justify-content-center align-items-end mt-2'}>
          <Language sx={{color: 'action.active', mr: 2, my: 0.5}}/>
          <TextField
            value={domain?.name}
            onChange={async event => await onChange('name', index, event.target.value)}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'{my_pattern}'}
            label={'Pattern'}
            className={'me-1'}
          />
        </div>
      </Grid>
      <Grid item xs={8}>
        <div className={'d-flex justify-content-center align-items-center mt-2'}>
          <TextField
            value={domain?.domain}
            onChange={async event => await onChange('domain', index, event.target.value)}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'^\\d$'}
            label={'Regex expression'}
            className={'me-2'}
          />
          <IconButton
            size={'small'}
            sx={{mt: 2}}
            onClick={onRemovePress}
            disabled={!isAllowed([PROJECT_SETTINGS.update])}
          >
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )
}

export default connect(
  null,
  {
    setConfirmAction
  },
)(Domain);
