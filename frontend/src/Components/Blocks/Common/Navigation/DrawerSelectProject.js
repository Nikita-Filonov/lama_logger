import React, {useState} from "react";
import {Box, ListItemSecondaryAction, Popover, Typography} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {common} from "../../../../Styles/Blocks";
import ListItem from "@mui/material/ListItem";
import {connect} from "react-redux";
import {setProject} from "../../../../Redux/Projects/projectActions";
import {generateProjectPath} from "../../../../Utils/Utils/Routing";
import {useHistory} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Settings} from "@mui/icons-material";
import List from "@mui/material/List";

const DrawerSelectProject = ({drawerOpen, project, projects, setProject}) => {
  const history = useHistory();
  const [selectProjectPopover, setSelectProjectPopover] = useState(null);

  const onOpen = (event) => setSelectProjectPopover(event.currentTarget);
  const onClose = () => setSelectProjectPopover(null);

  const onSelectProject = async (projectId) => {
    const selectedProject = projects.find(p => p.id === projectId)
    setProject(selectedProject);
    const path = generateProjectPath(history.location.pathname, selectedProject.id)
    history.push(path);
    onClose()
  }

  const onSettings = async (projectId) => {
    const selectedProject = projects.find(p => p.id === projectId)
    setProject(selectedProject);
    history.push(`/projects/${projectId}/settings/general`);
    onClose();
  }

  return (
    <React.Fragment>
      <ListItem button sx={{mb: 2, textAlign: 'center'}} onClick={onOpen}>
        <ListItemText
          style={common.ellipsisText}
          primary={drawerOpen ? project?.title : project?.short?.toUpperCase()}
        />
      </ListItem>
      <Popover
        disableScrollLock={false}
        open={Boolean(selectProjectPopover)}
        anchorEl={selectProjectPopover}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{p: 1}}>
          <Typography variant={'subtitle2'}>Select project</Typography>
          <List dense sx={{maxHeight: 250, mb: 2}}>
            {projects.map(p => <ListItem
              dense
              button
              disableGutters
              key={p.id}
              sx={{maxWidth: 200, pl: 1, pr: 1}}
              onClick={async () => await onSelectProject(p.id)}
              selected={project.id === p.id}
            >
              <Typography style={common.ellipsisText} sx={{mr: 2}}>{p.title}</Typography>
              <ListItemSecondaryAction>
                <IconButton size={'small'} onClick={async () => await onSettings(p.id)}>
                  <Settings fontSize={'small'}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>)}
          </List>
        </Box>
      </Popover>
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
)(DrawerSelectProject);
