import React, {useCallback, useEffect} from "react";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {parseQueryFromUrl} from "../../../../../Utils/Utils/Common";
import {Button, Checkbox, IconButton, TextField} from "@mui/material";
import {Add, Close} from "@mui/icons-material";
import {isValidJson} from "../../../../../Utils/Utils/Validators";

const RequestParams = ({customRequest, setCustomRequest}) => {
  const classes = CustomRequestsStyles();

  useEffect(() => {
    (async () => customRequest?.requestUrl && await getQueryParams())();
  }, [customRequest?.requestUrl]);

  const getQueryParams = useCallback(async () => {
    const notIncludedQueryParams = customRequest?.queryParams.filter(q => !q.include);
    const queryObject = await parseQueryFromUrl(customRequest?.requestUrl);
    const queryParams = Object.keys(queryObject).map(key => ({key: key, value: queryObject[key], include: true}));
    setCustomRequest({...customRequest, queryParams: [...queryParams, ...notIncludedQueryParams]});
  }, [customRequest?.queryParams, customRequest?.requestUrl])

  const onChange = async (value, index, key) => {
    const queryParams = customRequest?.queryParams?.map((payload, i) =>
      i === index
        ? {...payload, [key]: value}
        : payload
    );
    setCustomRequest({...customRequest, queryParams});
  }
  const onNewHeader = async () => {
    const queryParams = [...customRequest?.queryParams, {key: '', value: '', include: true}];
    setCustomRequest({...customRequest, queryParams});
  }
  const onRemove = async (index) => {
    const queryParams = customRequest?.queryParams?.filter((_, i) => i !== index);
    setCustomRequest({...customRequest, queryParams});
  }

  const onPasteQuery = async (event, index, key) => {
    const pastedValue = event.clipboardData.getData('Text');

    if (isValidJson(pastedValue)) {
      const pastedJson = JSON.parse(pastedValue);
      const queryParams = Object.keys(pastedJson).map(key => ({key: key, value: pastedJson[key], include: true}));
      setCustomRequest({...customRequest, queryParams: [...customRequest?.queryParams, ...queryParams]});
    } else {
      await onChange(pastedValue, index, key);
    }
  }

  return (
    <div className={classes.requestHeadersContainer}>
      {customRequest?.queryParams?.map(({key, value, include}, index) =>
        <div className={'d-flex align-items-center'} key={index}>
          <Checkbox
            size={'small'}
            checked={include}
            onClick={async event => await onChange(event.target.checked, index, 'include')}
          />
          <TextField
            sx={{mr: 2}}
            value={key}
            onPaste={async event => await onPasteQuery(event, index, 'key')}
            onChange={async event => await onChange(event.target.value, index, 'key')}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Key'}
          />
          <TextField
            value={value}
            onPaste={async event => await onPasteQuery(event, index, 'value')}
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
