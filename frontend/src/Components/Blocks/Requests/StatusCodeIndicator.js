import React from "react";
import {Circle} from "@mui/icons-material";
import {getStatusCodeColor} from "../../../Utils/Untils/Formatters";


export const StatusCodeIndicator = ({statusCode}) =>
  <Circle
    style={{color: getStatusCodeColor(statusCode)}}
    fontSize={'small'}
    className={'ms-2'}
  />
