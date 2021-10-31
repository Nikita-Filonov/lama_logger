import React from "react";
import {Grid, IconButton, TextField} from "@mui/material";
import {Close} from "@mui/icons-material";

export const TrackPattern = ({pattern}) => {
  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={6}>
        <div className={'d-flex justify-content-center align-items-center mt-2'}>
          <TextField
            value={pattern?.pattern}
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
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'^\\d$'}
            label={'Regex expression'}
            className={'me-2'}
          />
          <IconButton size={'small'} sx={{mt: 2}}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )
}
