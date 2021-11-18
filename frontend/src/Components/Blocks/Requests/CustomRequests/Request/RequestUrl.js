import React, {useCallback, useEffect} from "react";
import {TextField} from "@mui/material";
import {objectToQuery} from "../../../../../Utils/Utils/Common";
import {headersToObject} from "../../../../../Utils/Utils/Formatters";

export const RequestUrl = ({customRequest, setCustomRequest}) => {

  useEffect(() => {
    const timeout = setTimeout(async () => customRequest?.requestUrl && await queryObjectToString(), 500);
    return () => clearTimeout(timeout);
  }, [customRequest?.queryParams]);

  const queryObjectToString = useCallback(async () => {
    const queryObject = await headersToObject(customRequest?.queryParams);

    const currentUrl = customRequest?.requestUrl.split('?')[0];
    setCustomRequest({...customRequest, requestUrl: currentUrl + await objectToQuery(queryObject)});
  }, [customRequest?.requestUrl, customRequest?.queryParams])

  return (
    <TextField
      value={customRequest?.requestUrl || ''}
      onChange={event => setCustomRequest({...customRequest, requestUrl: event.target.value})}
      fullWidth
      className={'w-100'}
      variant={'standard'}
      placeholder={'Enter url'}
    />
  )
}
