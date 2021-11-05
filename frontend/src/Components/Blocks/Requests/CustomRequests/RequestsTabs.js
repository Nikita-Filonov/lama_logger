import React, {useState} from "react";
import {connect} from "react-redux";
import clsx from "clsx";
import {IconButton, Paper, Tabs} from "@mui/material";
import {CustomRequestsTabScrollButton, tabsStyles, ViewRequestStyles} from "../../../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import {useWindowSize} from "../../../../Utils/Hooks/LayoutHooks";
import {CustomRequestTab} from "../../../Items/Reuqests/CustomRequests/CustomRequestTab";


const RequestsTabs = ({customRequests}) => {
  const {width} = useWindowSize();
  const classes = ViewRequestStyles();
  const [value, setValue] = useState(0);

  const onSelectTab = (request, newValue) => {
    setValue(newValue)
  }


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
        style={{maxWidth: width / 1.2}}
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
      <IconButton size={'small'}>
        <Add/>
      </IconButton>
    </Paper>
  )
}

const getState = (state) => ({
  customRequests: state.customRequests.customRequests,
})

export default connect(
  getState,
  null,
)(RequestsTabs);
