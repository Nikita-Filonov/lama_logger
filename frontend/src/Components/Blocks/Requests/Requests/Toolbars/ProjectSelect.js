import React, {useState} from "react";
import {Button, ListItem, ListItemSecondaryAction, Menu, Tooltip} from "@mui/material";
import {connect} from "react-redux";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from "@mui/material/Typography";
import {common} from "../../../../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import {Settings} from "@mui/icons-material";
import {useProjects} from "../../../../../Providers/ProjectsProvider";

const ProjectSelect = ({project, projects}) => {
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);
  const {onSelectProject, onSelectProjectSettings} = useProjects();

  const onProject = async (projectId) => {
    await onSelectProject(projectId);
    onClose();
  };

  const onSettings = async (projectId) => {
    await onSelectProjectSettings(projectId);
    onClose();
  }

  return (
    <React.Fragment>
      <Tooltip title={'Select project'}>
        <Button
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
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
      >
        {projects.map(p => <ListItem
          button
          value={p.id}
          key={p.id}
          sx={{maxWidth: 300, width: 300}}
          onClick={async () => await onProject(p.id)}
          selected={project.id === p.id}
        >
          <Typography style={common.ellipsisText}>{p.title}</Typography>
          <div className={'flex-grow-1'}/>
          <ListItemSecondaryAction>
            <IconButton size={'small'} onClick={async () => await onSettings(p.id)}>
              <Settings fontSize={'small'}/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)}
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
  null,
)(ProjectSelect);
