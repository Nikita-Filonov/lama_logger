import React, {useEffect, useState} from "react";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {parseQueryFromUrl} from "../../../../../Utils/Utils/Common";
import {Button, Checkbox, IconButton, TextField} from "@mui/material";
import {Add, Close} from "@mui/icons-material";


const RequestParams = ({customRequest, setCustomRequest}) => {
  const classes = CustomRequestsStyles();
  const [params, setParams] = useState([]);

  useEffect(() => {
    (async () => await getQueryParams())();
  }, [customRequest?.requestUrl]);

  const getQueryParams = async () => {
    const queryObject = await parseQueryFromUrl(customRequest?.requestUrl);
    setParams(Object.keys(queryObject).map(key => ({key: key, value: queryObject[key], include: true})))
  }

  const onChange = async (value, index, key) => {
    const requestHeaders = customRequest?.requestHeaders?.map((payload, i) =>
      i === index
        ? {...payload, [key]: value}
        : payload
    );
    setCustomRequest({...customRequest, requestHeaders});
  }
  const onNewHeader = async () => {
    const requestHeaders = [...customRequest?.requestHeaders, {key: '', value: '', include: true}];
    setCustomRequest({...customRequest, requestHeaders});
  }
  const onRemove = async (index) => {
    const requestHeaders = customRequest?.requestHeaders?.filter((_, i) => i !== index);
    setCustomRequest({...customRequest, requestHeaders});
  }

  return (
    <div className={classes.requestHeadersContainer}>
      {params?.map(({key, value, include}, index) =>
        <div className={'d-flex align-items-center'} key={index}>
          <Checkbox
            size={'small'}
            checked={include}
            onClick={async event => await onChange(event.target.checked, index, 'include')}
          />
          <TextField
            sx={{mr: 2}}
            value={key}
            onChange={async event => await onChange(event.target.value, index, 'key')}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Key'}
          />
          <TextField
            value={value}
            onChange={async event => await onChange(event.target.value, index, 'value')}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Value'}
          />
          <IconButton size={'small'} sx={{mr: 1}} onClick={async () => await onRemove(index)}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
      )}
      <Button
        color={'inherit'}
        startIcon={<Add/>}
        size={'small'}
        sx={{ml: 1, mt: 1}}
        onClick={onNewHeader}
      >
        New query
      </Button>
    </div>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(RequestParams);
