import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import {Link as RouterLink} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";

export const ListItemLink = (props) => {
  const {to, open, title, ...other} = props;

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess/> : <ExpandMore/>;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={title}/>
        {icon}
      </ListItem>
    </li>
  );
}
