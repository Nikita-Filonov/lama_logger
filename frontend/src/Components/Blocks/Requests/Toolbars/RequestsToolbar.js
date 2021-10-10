import React, {useState} from "react";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../Menus/Requests/RequestsMenu";
import {Divider, Paper} from "@mui/material";
import {connect} from "react-redux";
import {setRequestsTimeFilterModal} from "../../../../Redux/Requests/requestsActions";
import {Search} from "../../Common/Search";
import ProjectSelect from "./ProjectSelect";
import {AccessTime, PeopleOutline} from "@mui/icons-material";
import Button from "@mui/material/Button";


const RequestsToolbar = ({setRequestsTimeFilterModal}) => {
  const classes = ViewRequestStyles();
  const [search, setSearch] = useState('')

  const onTimeFilters = () => setRequestsTimeFilterModal(true)

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <ProjectSelect/>
      <Divider orientation={'vertical'} flexItem style={{height: 40}} sx={{marginRight: 1, marginLeft: 1}}/>
      <Button startIcon={<AccessTime/>} color={'inherit'} onClick={onTimeFilters}>
        Time filters
      </Button>
      <Divider orientation={'vertical'} flexItem style={{height: 40}} sx={{marginRight: 1, marginLeft: 1}}/>
      <Button startIcon={<PeopleOutline/>} color={'inherit'} onClick={onTimeFilters}>
        Members filters
      </Button>
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


export default connect(
  null,
  {
    setRequestsTimeFilterModal
  },
)(RequestsToolbar);
