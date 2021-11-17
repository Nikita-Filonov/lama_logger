import React, {useCallback} from "react";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import {parsePastedValue} from "../../../../../Utils/Utils/Filters";
import HeadersFields from "../../../../Items/Reuqests/CustomRequests/HeadersFields";


export const RequestHeaders = ({customRequest, setCustomRequest, containerClass}) => {

  const onChange = useCallback(async (value, index, key) => {
    const requestHeaders = customRequest?.requestHeaders?.map((payload, i) =>
      i === index
        ? {...payload, [key]: value}
        : payload
    );
    setCustomRequest({...customRequest, requestHeaders});
  }, [customRequest?.requestHeaders]);

  const onNewHeader = useCallback(async () => {
    const requestHeaders = [...customRequest?.requestHeaders, {key: '', value: '', include: true}];
    setCustomRequest({...customRequest, requestHeaders});
  }, [customRequest?.requestHeaders]);

  const onRemove = useCallback(async (index) => {
    const requestHeaders = customRequest?.requestHeaders?.filter((_, i) => i !== index);
    setCustomRequest({...customRequest, requestHeaders});
  }, [customRequest?.requestHeaders]);

  const onPasteHeaders = useCallback(async (event, index, key) => {
    const {result, isJson} = await parsePastedValue(event);

    isJson
      ? setCustomRequest({...customRequest, requestHeaders: [...customRequest?.requestHeaders, ...result]})
      : await onChange(result, index, key);
  }, [customRequest?.requestHeaders])

  return (
    <div className={containerClass}>
      {customRequest?.requestHeaders?.map((header, index) =>
        <HeadersFields
          key={index}
          index={index}
          header={header}
          onChange={onChange}
          onPasteHeaders={onPasteHeaders}
          onRemove={onRemove}
        />
      )}
      <Button
        color={'inherit'}
        startIcon={<Add/>}
        size={'small'}
        sx={{ml: 1, mt: 1}}
        onClick={onNewHeader}
      >
        New header
      </Button>
    </div>
  )
}
