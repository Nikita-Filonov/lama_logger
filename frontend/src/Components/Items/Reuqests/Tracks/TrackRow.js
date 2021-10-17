import React, {useMemo, useRef} from "react";
import {connect} from "react-redux";
import {Checkbox, TableCell, TableRow, Typography} from '@mui/material';
import {RequestsTableStyles} from "../../../../Styles/Blocks";
import {setSelectedRequests} from "../../../../Redux/Requests/Requests/requestsActions";

const TrackRow = ({track, requests, selectedRequests, setSelectedRequests}) => {
  const classes = RequestsTableStyles();
  const rowRef = useRef(null);
  const isSelected = useMemo(() => selectedRequests.indexOf(track.id) !== -1, [selectedRequests]);

  return (
    <React.Fragment>
      <TableRow
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
        ref={rowRef}
        selected={isSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            size={'small'}
            color={'primary'}
            checked={isSelected}
            onClick={() => setSelectedRequests({isSelected, trackId: track.id})}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {track.endpoint}
        </TableCell>
        <TableCell align="left">
          <Typography className={classes.rowRequestUrlText}>{track?.times}</Typography>
        </TableCell>
        <TableCell align="right" className={'d-flex'}>
          <Typography>{track?.timesActual}</Typography>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const getState = (state) => ({
  requests: state.requests.requests,
  selectedRequests: state.requests.selectedRequests
})

export default connect(
  getState,
  {
    setSelectedRequests
  },
)(TrackRow);
