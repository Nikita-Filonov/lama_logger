import React from "react";
import {Avatar} from "@material-ui/core";

export const UserOption = ({label, image = null}) =>
  <div className={'d-flex align-items-center'}>
    <Avatar
      style={{width: 30, height: 30}}
      className={'me-2'}
      src={image}
    />
    {label}
  </div>
