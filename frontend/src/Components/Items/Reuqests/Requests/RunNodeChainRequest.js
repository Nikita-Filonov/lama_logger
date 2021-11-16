import React, {useMemo} from "react";
import {Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {METHOD_COLORS} from "../../../../Utils/Constants";


export const RunNodeChainRequest = ({request, onSelect, selectedRequests}) => {
  const selected = useMemo(() => selectedRequests.indexOf(request?.requestId) !== -1, [selectedRequests]);

  return (
    <ListItem dense disablePadding divider>
      <ListItemButton dense onClick={async () => await onSelect(request?.requestId, selected)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            checked={selected}
          />
        </ListItemIcon>
        <ListItemText primary={request?.requestUrl}/>
        <ListItemText sx={{color: METHOD_COLORS[request?.method]}} primary={request?.method}/>
      </ListItemButton>
    </ListItem>
  )
}
