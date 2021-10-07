import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {Link} from "react-router-dom";
import {setProject} from "../../../Redux/Projects/projectActions";
import {connect} from "react-redux";
import ProjectMenu from "../../Menus/Projects/ProjectMenu";

const Project = ({project, setProject}) => {

  const onOpenProject = () => {
    setProject(project)
    localStorage.setItem('project', JSON.stringify(project))
  }

  return (
    <ListItemButton>
      <ListItemIcon onClick={onOpenProject}>
        <FormatListBulletedIcon/>
      </ListItemIcon>
      <Link
        className={'text-decoration-none'}
        to={`/projects/${project.id}`}
        onClick={onOpenProject}>
        {project.title}
      </Link>
      <div className={'flex-grow-1'}/>
      <ProjectMenu project={project}/>
    </ListItemButton>
  )
}


export default connect(
  null,
  {
    setProject
  },
)(Project);
