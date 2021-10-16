import React from "react";
import {Table, TableBody, TableContainer} from "@mui/material";
import {getComparator, stableSort} from "../../../../Utils/Untils/Sorting";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ProjectRow from "../../../Items/Projects/ProjectRow";
import {connect} from "react-redux";
import {ProjectsTableHeader} from "./ProjectsTableHeader";


const ProjectsTable = ({projects}) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = projects.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <ProjectsTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort}/>
            <TableBody>
              {stableSort(projects, getComparator(order, orderBy))
                .map(project => <ProjectRow key={project.id} project={project}/>)}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

const getState = (state) => ({
  projects: state.projects.projects
})

export default connect(
  getState,
  null,
)(ProjectsTable);
