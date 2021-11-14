import React, {useCallback, useEffect} from "react";
import {TextField} from "@mui/material";
import {objectToQuery} from "../../../../../Utils/Utils/Common";

export const RequestUrl = ({customRequest, setCustomRequest}) => {

  useEffect(() => {
    (async () => customRequest?.requestUrl && await queryObjectToString())()
  }, [customRequest?.queryParams]);

  const queryObjectToString = useCallback(async () => {
    let queryObject = {};
    for (let i = 0; i < customRequest?.queryParams?.length; i++) {
      const key = customRequest?.queryParams[i].key;
      const value = customRequest?.queryParams[i].value;
      if (customRequest?.queryParams[i].include && (key.length > 0 || value.length > 0)) {
        queryObject[key] = value;
      }
    }

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
