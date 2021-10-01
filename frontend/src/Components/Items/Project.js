import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListItemText from "@mui/material/ListItemText";

export const Project = ({project}) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <FormatListBulletedIcon/>
      </ListItemIcon>
      <ListItemText primary={project.title}/>
    </ListItemButton>
  )
}
