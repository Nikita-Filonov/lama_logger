import React from "react";
import {Grid, IconButton, TextField} from "@mui/material";
import {Close, Language} from "@mui/icons-material";

export const Domain = ({domain, index, onChange, onRemove}) =>
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
        <IconButton size={'small'} sx={{mt: 2}} onClick={async () => await onRemove(index)}>
          <Close fontSize={'small'}/>
        </IconButton>
      </div>
    </Grid>
  </Grid>
