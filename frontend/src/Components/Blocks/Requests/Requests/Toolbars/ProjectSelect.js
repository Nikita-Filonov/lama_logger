import React, {useState} from "react";
import {Button, Menu, Tooltip} from "@mui/material";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {setProject} from "../../../../../Redux/Projects/projectActions";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {common} from "../../../../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import {Settings} from "@mui/icons-material";
import {generateProjectPath} from "../../../../../Utils/Utils/Routing";

const ProjectSelect = ({project, projects, setProject}) => {
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);


  const onSelectProject = (event) => {
    if (!event?.target?.value) {
      return;
    }

    const selectedProject = projects.find(p => p.id === event.target.value)
    setProject(selectedProject);
    const path = generateProjectPath(history.location.pathname, selectedProject.id)
    history.push(path);
    onClose()
  }

  return (
    <React.Fragment>
      <Tooltip title={'Select project'}>
        <Button
          id={'basic-button'}
          color={'inherit'}
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={menu ? 'true' : undefined}
          onClick={onOpen}
          startIcon={<FormatListBulletedIcon/>}
          endIcon={<KeyboardArrowDownIcon/>}
        >
          <Typography style={{...common.ellipsisText, maxWidth: 150, width: 150}}>{project.title}</Typography>
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        onClick={onSelectProject}
      >
        {projects.map(p => <MenuItem
          value={p.id}
          key={p.id}
          sx={{maxWidth: 300}}
          onClick={onSelectProject}
          selected={project.id === p.id}
        >
          <Typography style={common.ellipsisText}>{p.title}</Typography>
          <div className={'flex-grow-1'}/>
          <IconButton size={'small'}><Settings fontSize={'small'}/></IconButton>
        </MenuItem>)}
      </Menu>
    </React.Fragment>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  projects: state.projects.projects,
})

export default connect(
  getState,
  {
    setProject
  },
)(ProjectSelect);
