import React, {useState} from "react";
import {Box, Divider, ListItemSecondaryAction, Popover, Typography} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {common} from "../../../../Styles/Blocks";
import ListItem from "@mui/material/ListItem";
import {connect} from "react-redux";
import IconButton from "@mui/material/IconButton";
import {Settings} from "@mui/icons-material";
import List from "@mui/material/List";
import {useProjects} from "../../../../Providers/ProjectsProvider";

const DrawerSelectProject = ({drawerOpen, project, projects}) => {
  const {onSelectProject, onSelectProjectSettings} = useProjects();
  const [selectProjectPopover, setSelectProjectPopover] = useState(null);

  const onOpen = (event) => setSelectProjectPopover(event.currentTarget);
  const onClose = () => setSelectProjectPopover(null);

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
          <Box sx={{mb: 0.7}}>
            <Typography variant={'subtitle2'}>Select project</Typography>
          </Box>
          <Divider/>
          <List dense sx={{maxHeight: 250, mb: 1, ...common.hoverScroll}}>
            {projects.map(p => <ListItem
              dense
              button
              disableGutters
              key={p.id}
              sx={{maxWidth: 200, pl: 1, pr: 1, width: 200}}
              onClick={async () => await onProject(p.id)}
              selected={project.id === p.id}
            >
              <Typography style={common.ellipsisText} sx={{mr: 2}}>{p.title}</Typography>
              <ListItemSecondaryAction>
                <IconButton sx={{mr: 0.5}} size={'small'} onClick={async () => await onSettings(p.id)}>
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
  null,
)(DrawerSelectProject);
