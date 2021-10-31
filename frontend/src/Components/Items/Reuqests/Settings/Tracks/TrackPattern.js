import React from "react";
import {Grid, IconButton, TextField} from "@mui/material";
import {Close} from "@mui/icons-material";

export const TrackPattern = ({index, pattern, onChange, onRemove}) => {
  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={6}>
        <div className={'d-flex justify-content-center align-items-center mt-2'}>
          <TextField
            value={pattern?.pattern}
            onChange={async event => await onChange('pattern', index, event.target.value)}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'{my_pattern}'}
            label={'Pattern'}
            className={'me-1'}
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={'d-flex justify-content-center align-items-center mt-2'}>
          <TextField
            value={pattern?.regex}
            onChange={async event => await onChange('regex', index, event.target.value)}
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
  )
}
