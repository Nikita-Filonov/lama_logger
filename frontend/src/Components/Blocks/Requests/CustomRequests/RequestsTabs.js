import React, {useState} from "react";
import {connect} from "react-redux";
import clsx from "clsx";
import {IconButton, Paper, Tabs} from "@mui/material";
import {CustomRequestsTabScrollButton, tabsStyles, ViewRequestStyles} from "../../../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import {useWindowSize} from "../../../../Utils/Hooks/LayoutHooks";
import {CustomRequestTab} from "../../../Items/Reuqests/CustomRequests/CustomRequestTab";
import {setCustomRequest} from "../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {useCustomRequests} from "../../../../Providers/Requests/CustomRequestsPorvider";


const RequestsTabs = ({customRequests, project, drawer, setCustomRequest}) => {
  const {width} = useWindowSize();
  const {createCustomRequest} = useCustomRequests();
  const classes = ViewRequestStyles();
  const [value, setValue] = useState(0);

  const onSelectTab = (request, newValue) => {
    setCustomRequest(request);
    setValue(newValue);
  }

  const onCreate = async () => await createCustomRequest(project.id, {isCustom: true});

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex align-items-center', classes.toolbarContainer)}
    >
      <Tabs
        value={value}
        ScrollButtonComponent={CustomRequestsTabScrollButton}
        sx={tabsStyles}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        style={{width: drawer ? width / 1.35 : width / 1.15, transition: 'width 0.3s',}}
      >
        {customRequests?.results?.map((request, index) =>
          <CustomRequestTab
            key={index}
            index={index}
            request={request}
            onSelectTab={onSelectTab}
          />
        )}
      </Tabs>
      <div className={'flex-grow-1'}/>
      <IconButton size={'small'} onClick={onCreate}>
        <Add/>
      </IconButton>
    </Paper>
  )
}

const getState = (state) => ({
  drawer: state.users.drawer,
  project: state.projects.project,
  customRequests: state.customRequests.customRequests,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(RequestsTabs);