import React, {memo} from "react";
import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {Add, Close} from "@mui/icons-material";

const HeadersFiltersSettings = ({filterHeaders, onNewHeader, onRemoveHeader, onChangeHeader}) => {
  return (
    <React.Fragment>
      <Typography className={'mt-3'}>Headers</Typography>
      <Typography variant={'body2'}>Setup headers, so you will be able to choose headers filters quickly</Typography>
      <Grid container xs={10} className={'mt-3'} spacing={2}>
        <Grid item xs={5}>
          <Typography>Keys</Typography>
          {filterHeaders?.keys?.map((headerKey, index) =>
            <div key={index} className={'d-flex justify-content-center align-items-center mt-2'}>
              <TextField
                fullWidth
                value={headerKey}
                variant={'standard'}
                size={'small'}
                placeholder={'Key'}
                label={'Key'}
                className={'me-1'}
                onChange={async event => await onChangeHeader('keys', index, event.target.value)}
              />
              <IconButton size={'small'} sx={{mt: 2}} onClick={() => onRemoveHeader('keys', index)}>
                <Close fontSize={'small'}/>
              </IconButton>
            </div>
          )}
          <Button
            fullWidth
            startIcon={<Add/>}
            sx={{mt: 2}}
            size={'small'}
            color={'inherit'}
            className={'justify-content-start'}
            onClick={async () => await onNewHeader('keys')}
          >
            New key
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Typography>Values</Typography>
          {filterHeaders?.values?.map((headerValue, index) =>
            <div key={index} className={'d-flex justify-content-center align-items-center mt-2'}>
              <TextField
                fullWidth
                value={headerValue}
                variant={'standard'}
                size={'small'}
                placeholder={'Key'}
                label={'Key'}
                className={'me-2'}
                onChange={async event => await onChangeHeader('values', index, event.target.value)}
              />
              <IconButton size={'small'} sx={{mt: 2}} onClick={() => onRemoveHeader('values', index)}>
                <Close fontSize={'small'}/>
              </IconButton>
            </div>
          )}
          <Button
            fullWidth
            startIcon={<Add/>}
            sx={{mt: 2}}
            size={'small'}
            color={'inherit'}
            className={'justify-content-start'}
            onClick={async () => await onNewHeader('values')}
          >
            New value
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default memo(HeadersFiltersSettings);
