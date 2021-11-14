import React, {useState} from "react";
import {Button, Menu, Tooltip} from "@mui/material";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {common} from "../../../../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import {Settings} from "@mui/icons-material";
import {setTrack} from "../../../../../Redux/Requests/Tracks/tracksActions";

const TrackSelect = ({project, service, track, setTrack}) => {
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

  const onSelectTrack = (track) => {
    setTrack(track);
    history.push(`/projects/${project?.id}/tracks/${track.id}`);
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
          <Typography style={{...common.ellipsisText, maxWidth: 200, width: 200}}>{track.endpoint}</Typography>
        </Button>
      </Tooltip>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
      >
        {service?.tracks?.map(t =>
          <Tooltip title={t.endpoint} arrow placement={'right'}>
            <MenuItem
              value={t.id}
              key={t.id}
              sx={{maxWidth: 300, width: 300}}
              onClick={() => onSelectTrack(t)}
              selected={track.id === t.id}
            >
              <Typography onClick={() => onSelectTrack(t)} style={common.ellipsisText}>{t.endpoint}</Typography>
              <div className={'flex-grow-1'}/>
              <IconButton size={'small'}><Settings fontSize={'small'}/></IconButton>
            </MenuItem>
          </Tooltip>
        )}
      </Menu>
    </React.Fragment>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  service: state.tracks.service,
  track: state.tracks.track,
})

export default connect(
  getState,
  {
    setTrack,
  },
)(TrackSelect);
