import React, {useMemo} from "react";
import List from "@mui/material/List";
import {Checkbox, Divider, ListItem, ListItemIcon, ListItemText, ListSubheader, useTheme} from "@mui/material";
import {ProjectSettingsStyles} from "../../../../../../Styles/Screens";
import {INSTANCES} from "../../../../../../Utils/Constants";

export const ScopesList = ({scopes, onSelectScope}) => {
  const {palette} = useTheme();
  const classes = ProjectSettingsStyles();

  const subheaderBackground = palette.mode === 'light' ? 'white' : '#4D4D4D'

  const Permission = ({inst, permission}) => {
    const isSelected = useMemo(() => scopes.indexOf(`${inst}.${permission}`) !== -1, [scopes])

    return (
      <ListItem button onClick={async () => await onSelectScope(isSelected, `${inst}.${permission}`)}>
        <ListItemIcon>
          <Checkbox
            checked={isSelected}
            edge="start"
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={permission}/>
      </ListItem>
    )
  }

  return (
    <List
      dense
      className={classes.sectionList}
      subheader={<li/>}
    >
      {INSTANCES.map((inst) => (
        <li key={`section-${inst.label}`}>
          <ul>
            <ListSubheader sx={{backgroundColor: subheaderBackground}}>
              {inst.label}
            </ListSubheader>
            <Divider/>
            {['Create', 'Update', 'Delete'].map((permission, index) =>
              <Permission inst={inst.inst} permission={permission} key={permission + index}/>
            )}
          </ul>
        </li>
      ))}
    </List>
  )
}
