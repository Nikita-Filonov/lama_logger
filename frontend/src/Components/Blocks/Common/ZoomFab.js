import React from "react";
import {Fab, Zoom} from "@mui/material";
import {common} from "../../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";

export const ZoomFab = ({action, variant = 'extended'}) => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom
      in={true}
      timeout={transitionDuration}
      style={{transitionDelay: `${transitionDuration.exit}ms`}}
      unmountOnExit
    >
      <Fab variant={variant} sx={common.fab} color={'primary'} onClick={action}>
        <Add/>
        INVITE
      </Fab>
    </Zoom>
  )
}
