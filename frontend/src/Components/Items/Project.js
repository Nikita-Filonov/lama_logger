import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListItemText from "@mui/material/ListItemText";
import {useHistory} from "react-router-dom";
import {setProject} from "../../Redux/Projects/projectActions";
import {connect} from "react-redux";

const Project = ({project, setProject}) => {
  const history = useHistory()

  const onOpenProject = () => {
    setProject(project)
    localStorage.setItem('project', JSON.stringify(project))
    history.push(`/projects/${project.id}`)
  }

  return (
    <ListItemButton onClick={onOpenProject}>
      <ListItemIcon>
        <FormatListBulletedIcon/>
      </ListItemIcon>
      <ListItemText primary={project.title}/>
    </ListItemButton>
  )
}


export default connect(
  null,
  {
    setProject
  },
)(Project);
