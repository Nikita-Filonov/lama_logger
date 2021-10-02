import React from "react";
import {getStatusCodeColor} from "../../../Utils/Utils";
import {Circle} from "@mui/icons-material";


export const StatusCodeIndicator = ({statusCode}) =>
  <Circle
    style={{color: getStatusCodeColor(statusCode)}}
    fontSize={'small'}
    className={'ms-2'}
  />
