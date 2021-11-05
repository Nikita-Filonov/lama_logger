import React from "react";
import {IconButton, Tab, Typography} from "@mui/material";
import {common, tabsStyles} from "../../../../Styles/Blocks";
import {Close} from "@mui/icons-material";
import {METHOD_COLORS} from "../../../../Utils/Constants";


export const CustomRequestTab = ({request, index, onSelectTab}) => {
  return (
    <Tab
      onClick={() => onSelectTab(request, index)}
      value={index}
      sx={{...tabsStyles, pr: 0.5, pl: 1}}
      style={{flexDirection: 'row'}}
      label={
        <React.Fragment>
          <Typography
            variant={'body2'}
            sx={{mr: 1.5}}
            color={METHOD_COLORS[request?.method]}
          >
            {request?.method}
          </Typography>
          <Typography variant={'body2'} style={common.ellipsisText}>{request?.requestUrl}</Typography>
          <IconButton size={'small'}>
            <Close fontSize={'small'}/>
          </IconButton>
        </React.Fragment>
      }
    />
  )
}
