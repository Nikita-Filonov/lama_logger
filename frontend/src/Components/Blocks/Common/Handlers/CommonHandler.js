import React from "react";
import {Typography} from "@mui/material";

class CommonHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error, errorInfo});
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div style={{whiteSpace: 'pre-wrap'}}>
          <Typography variant={'h6'}>Error happened while rendering this component</Typography>
          {this.state.error && <Typography variant={'body2'}>{this.state.error.toString()}</Typography>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default CommonHandler;
