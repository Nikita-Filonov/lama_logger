import React from "react";
import {TableCell, TableRow} from "@mui/material";
import {setProject} from "../../../Redux/Projects/projectActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ProjectMenu from "../../Menus/Projects/ProjectMenu";

const ProjectRow = ({project, setProject}) => {
  const onOpenProject = () => setProject(project);

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
    >
      <TableCell>
        <Link onClick={onOpenProject} to={`projects/${project.id}/requests`}>{project.title}</Link>
      </TableCell>
      <TableCell align="left">{project?.requestCount}</TableCell>
      <TableCell align="left">{project?.membersCount}</TableCell>
      <TableCell align="left"><ProjectMenu project={project}/></TableCell>
    </TableRow>
  )
}

export default connect(
  null,
  {
    setProject
  },
)(ProjectRow);
