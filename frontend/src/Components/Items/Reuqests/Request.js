import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListItemText from "@mui/material/ListItemText";
import {setProject} from "../../../Redux/Projects/projectActions";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {getStatusCodeColor} from "../../../Utils/Utils";

const Request = ({request}) => {

  return (
    <ListItemButton>
      <ListItemIcon>
        <FormatListBulletedIcon/>
      </ListItemIcon>
      <ListItemText
        primary={<a href={request.request_url} target={'_blank'} className={'text-decoration-none'}>
          {request.request_url}
        </a>}
      />
      <Typography>{request.response_code}</Typography>
      <div style={{
        backgroundColor: getStatusCodeColor(request.response_code),
        width: 15, height: 15, borderRadius: 10,
        marginLeft: 20
      }}/>
    </ListItemButton>
  )
}


export default connect(
  null,
  {
    setProject
  },
)(Request);
