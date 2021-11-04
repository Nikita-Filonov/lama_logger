import React, {useState} from "react";
import {Button, Divider, Grid, IconButton, Paper, TextField} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {DragHandle, Send} from "@mui/icons-material";
import {Resizable} from 'react-resizable';

export const RequestSection = () => {
  const [height, setHeight] = useState(200);

  const onResize = (event, {element, size, handle}) => setHeight(size.height);


  return (
    <Resizable
      axis={'y'}
      height={height}
      width={'100%'}
      onResize={onResize}
      className="box"
      handle={
        <div style={{position: 'absolute', bottom: 0, width: '100%', justifyContent: 'center'}}>
          <Divider/>
          <IconButton size={'small'}>
            <DragHandle fontSize={'small'}/>
          </IconButton>
        </div>
      }
    >
      <Paper sx={{p: 1, mt: 2, height}} elevation={3} className={'d-flex justify-content-center box'}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Button
              fullWidth
              color={'inherit'}
              endIcon={<KeyboardArrowDownIcon/>}
            >
              POST
            </Button>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              variant={'standard'}
              placeholder={'Enter url'}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              fullWidth
              endIcon={<Send/>}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Resizable>
  )
}
