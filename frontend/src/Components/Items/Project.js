import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListItemText from "@mui/material/ListItemText";
import {useHistory} from "react-router-dom";

export const Project = ({project}) => {
  const history = useHistory()

  const onOpenProject = () => history.push(`/projects/${project.id}`)

  return (
    <ListItemButton onClick={onOpenProject}>
      <ListItemIcon>
        <FormatListBulletedIcon/>
      </ListItemIcon>
      <ListItemText primary={project.title}/>
    </ListItemButton>
  )
}
