import React, {useState} from "react";
import {connect} from "react-redux";
import {Divider, IconButton, Tooltip} from "@mui/material";
import {Close} from "@material-ui/icons";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {styled} from '@mui/material/styles';
import {Paper} from "@material-ui/core";
import {Headers} from "./Headers";
import {StatusCodeIndicator} from "./StatusCodeIndicator";
import {Body} from "./Body";
import {AccordionTitle} from "./AccordionTitle";


const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center'
}));

const ViewRequest = ({request, setRequest}) => {
  const [accordion, setAccordion] = useState({
    'Url': true,
    'Request headers': true,
    'Status code': true,
    'Request body': true,
    'Response headers': true,
    'Response body': true
  });
  const onClose = () => setRequest({})

  const onExpand = (block) => setAccordion({...accordion, [block]: !accordion[block]})

  return (
    <div>
      <div className={'d-flex'}>
        <div className={'flex-grow-1'}/>
        <Tooltip title={'Close request'}>
          <IconButton onClick={onClose}>
            <Close/>
          </IconButton>
        </Tooltip>
      </div>

      <AccordionTitle title={'Url'} onExpand={onExpand} accordion={accordion}/>
      {accordion['Url'] && <Item>{request.request_url}</Item>}
      <AccordionTitle title={'Status code'} onExpand={onExpand} accordion={accordion}/>
      {accordion['Status code'] &&
      <Item>{request.response_code}<StatusCodeIndicator statusCode={request.response_code}/></Item>}

      <AccordionTitle title={'Request headers'} onExpand={onExpand} accordion={accordion}/>
      {accordion['Request headers'] && <Headers headers={request.request_headers}/>}

      <AccordionTitle title={'Request body'} onExpand={onExpand} accordion={accordion}/>
      {accordion['Request body'] && <Body body={request.request_body} responseHeaders={request.request_headers}/>}

      <Divider className={'mt-3 mb-3'}/>

      <AccordionTitle title={'Response headers'} onExpand={onExpand} accordion={accordion}/>
      {accordion['Response headers'] && <Headers headers={request.response_headers}/>}

      <AccordionTitle title={'Response body'} onExpand={onExpand} accordion={accordion}/>
      {accordion['Response body'] && <Body body={request.response_body} responseHeaders={request.response_headers}/>}
    </div>
  )
}


const getState = (state) => (
  {
    request: state.requests.request
  }
)

export default connect(
  getState,
  {
    setRequest
  }
  ,
)(ViewRequest);
