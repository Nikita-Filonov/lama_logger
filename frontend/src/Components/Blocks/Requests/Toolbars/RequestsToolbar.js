import React from "react";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../Menus/Requests/RequestsMenu";
import {Button, Typography} from "@mui/material";
import {AccessTime} from "@material-ui/icons";
import {connect} from "react-redux";
import {setRequestsTimeFilterModal} from "../../../../Redux/Requests/requestsActions";

const RequestsToolbar = ({setRequestsTimeFilterModal}) => {
  const classes = ViewRequestStyles()

  const onTimeFilters = () => setRequestsTimeFilterModal(true)

  return (
    <div className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}>
      <Typography variant={'h6'}>Requests</Typography>
      <div className={'flex-grow-1'}/>
      <Button className={'me-5'} startIcon={<AccessTime/>} color={'inherit'} onClick={onTimeFilters}>
        Time filters
      </Button>
      <RequestsMenu/>
    </div>
  )
}

export default connect(
  null,
  {
    setRequestsTimeFilterModal
  },
)(RequestsToolbar);
