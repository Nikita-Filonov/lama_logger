import React from "react";
import {Alert, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

export const ResponseErrorAlert = ({error, setError}) => {

  const onClose = () => setError({...error, data: null});

  return (
    <Box sx={{width: '100%'}}>
      <Alert
        variant={'outlined'}
        severity={error?.level || 'error'}
        action={
          <Tooltip title={'Close alert'} arrow>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit"/>
            </IconButton>
          </Tooltip>
        }
        sx={{mb: 2}}
      >
        {error?.data}
      </Alert>
    </Box>
  )
}
