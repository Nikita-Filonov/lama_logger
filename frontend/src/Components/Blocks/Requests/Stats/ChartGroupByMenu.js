import React, {useState} from "react";
import {Button, Menu} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";

export const ChartGroupByMenu = () => {
  const [groupByMenu, setGroupByMenu] = useState(null);

  const onOpenGroupMenu = (event) => setGroupByMenu(event.currentTarget);
  const onCloseGroupMenu = () => setGroupByMenu(null);

  return (
    <div className={'d-flex'}>
      <Button
        size={'small'}
        sx={{ml: 2, mb: 1, mt: 1}}
        onClick={onOpenGroupMenu}
        color={'inherit'}
        endIcon={<KeyboardArrowDownIcon/>}
      >
        Group: Hours
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
        <MenuItem>By hours</MenuItem>
        <MenuItem>By days</MenuItem>
      </Menu>
    </div>
  )
}
