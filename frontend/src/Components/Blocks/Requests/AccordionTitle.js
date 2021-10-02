import React from "react";
import {IconButton, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

export const AccordionTitle = ({title, onExpand, accordion}) =>
  <div className={'d-flex'}>
    <Typography variant={'body2'} className={'mt-2 mb-2'}>{title}</Typography>
    <div className={'flex-grow-1'}/>
    <IconButton size={'small'} onClick={() => onExpand(title)}>
      {accordion[title] ? <ExpandLess fontSize={'small'}/> : <ExpandMore fontSize={'small'}/>}
    </IconButton>
  </div>
