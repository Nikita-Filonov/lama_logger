import React from "react";
import {getStatusCodeColor} from "../../../Utils/Utils";


export const StatusCodeIndicator = ({statusCode}) => <div style={{
  backgroundColor: getStatusCodeColor(statusCode),
  width: 15, height: 15, borderRadius: 10,
  marginLeft: 20
}}/>
