import React, {useState} from "react";
import {RequestsToolbarStyles, ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../Menus/Requests/RequestsMenu";
import {Divider, IconButton, Paper, Tooltip} from "@mui/material";
import {connect} from "react-redux";
import {setRequestsRealtime, setRequestsTimeFilterModal} from "../../../../Redux/Requests/requestsActions";
import {Search} from "../../Common/Search";
import ProjectSelect from "./ProjectSelect";
import {AccessTime, PauseOutlined, PeopleOutline} from "@mui/icons-material";
import Button from "@mui/material/Button";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';


const RequestsToolbar = ({setRequestsTimeFilterModal, requestsRealtime, setRequestsRealtime}) => {
  const classes = ViewRequestStyles();
  const [search, setSearch] = useState('')

  const onTimeFilters = () => setRequestsTimeFilterModal(true)

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <ProjectSelect/>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Button startIcon={<AccessTime/>} color={'inherit'} onClick={onTimeFilters}>
        Time filters
      </Button>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Button startIcon={<PeopleOutline/>} color={'inherit'} onClick={onTimeFilters}>
        Members filters
      </Button>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Tooltip title={(requestsRealtime ? 'Disable' : 'Enable') + ' realtime updates'}>
        <IconButton onClick={() => setRequestsRealtime(!requestsRealtime)}>
          {requestsRealtime ? <PauseOutlined/> : <PlayArrowOutlinedIcon/>}
        </IconButton>
      </Tooltip>
      <div className={'flex-grow-1'}/>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder={'Search by url, code, method'}
      />
      <RequestsMenu/>
    </Paper>
  )
}

const getState = (state) => ({
  requestsRealtime: state.requests.requestsRealtime,
})

export default connect(
  getState,
  {
    setRequestsRealtime,
    setRequestsTimeFilterModal
  },
)(RequestsToolbar);
