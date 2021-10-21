import React from "react";
import {Avatar, Typography} from "@mui/material";
import Box from "@mui/material/Box";


export const UserOption = ({props, label, image = null}) =>
  <Box{...props} sx={{'& > img': {mr: 2, flexShrink: 0}}} component={'li'}>
    <Avatar
      style={{width: 30, height: 30}}
      className={'me-2'}
      src={image}
    />
    <Typography sx={{ml: 1}}>{label}</Typography>
  </Box>

