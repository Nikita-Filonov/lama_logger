import React, {useState} from "react";
import {Button, Menu} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import {connect} from "react-redux";
import {setStatsGroupBy} from "../../../../../Redux/Requests/Stats/statsActions";

const ChartGroupByMenu = ({statsGroupBy, setStatsGroupBy, chart}) => {
  const [groupByMenu, setGroupByMenu] = useState(null);

  const onOpenGroupMenu = (event) => setGroupByMenu(event.currentTarget);
  const onCloseGroupMenu = () => setGroupByMenu(null);

  const onSelect = async (value) => {
    setStatsGroupBy({...statsGroupBy, [chart]: value});
    onCloseGroupMenu();
  }

  return (
    <div className={'d-flex'}>
      <Button
        size={'small'}
        sx={{ml: 2, mb: 1, mt: 1}}
        onClick={onOpenGroupMenu}
        color={'inherit'}
        endIcon={<KeyboardArrowDownIcon/>}
      >
        Group: {statsGroupBy[chart]}
      </Button>
      <Menu
        anchorEl={groupByMenu}
        open={Boolean(groupByMenu)}
        onClose={onCloseGroupMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={async () => await onSelect('hours')}>By hours</MenuItem>
        <MenuItem onClick={async () => await onSelect('days')}>By days</MenuItem>
      </Menu>
    </div>
  )
}

const getState = (state) => ({
  statsGroupBy: state.stats.statsGroupBy
})

export default connect(
  getState,
  {
    setStatsGroupBy
  },
)(ChartGroupByMenu);
