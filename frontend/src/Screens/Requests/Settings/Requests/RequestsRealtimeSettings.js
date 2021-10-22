import React, {useEffect, useMemo, useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import Box from "@mui/material/Box";
import {SaveOutlined} from "@mui/icons-material";
import {Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {UNITS} from "../../../../Utils/Constants";
import Button from "@mui/material/Button";
import {setRequestsRealtime} from "../../../../Redux/Requests/Requests/requestsActions";
import {normalizeAmount} from "../../../../Utils/Utils/Common";
import {useAlerts} from "../../../../Providers/AlertsProvider";


const RequestsRealtimeSettings = ({requestsRealtime, setRequestsRealtime}) => {
  const classes = ProjectSettingsStyles();
  const {setAlert} = useAlerts();
  const [realtimeSettings, setRealtimeSettings] = useState(requestsRealtime);

  useEffect(() => setRealtimeSettings(requestsRealtime), [requestsRealtime]);

  const disabled = useMemo(() => {
    if (realtimeSettings?.unit !== requestsRealtime?.unit) {
      return false;
    }

    return realtimeSettings?.amount === requestsRealtime?.amount;
  }, [realtimeSettings, requestsRealtime])

  const onSave = async () => {
    setRequestsRealtime({
      ...realtimeSettings,
      normalizedAmount: await normalizeAmount(realtimeSettings?.unit, realtimeSettings?.amount)
    })
    setAlert({message: 'Realtime updates settings was successfully changed', level: 'success'});
  }

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Requests realtime settings'}/>
      <Grid item xs={12} className={'mt-3'}>
        <div className={'w-50 d-flex'}>
          <TextField
            value={realtimeSettings?.amount}
            onChange={event => setRealtimeSettings({...realtimeSettings, amount: parseInt(event.target.value)})}
            type={'number'}
            fullWidth
            variant={'standard'}
            label={'Amount'}
          />
          <FormControl variant="standard" sx={{marginLeft: 3, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
            <Select
              value={realtimeSettings?.unit}
              onChange={event => setRealtimeSettings({...realtimeSettings, unit: event.target.value})}
            >
              {UNITS.map(int =>
                <MenuItem key={int.unit} value={int.unit}>{int.label}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>
          <Button
            onClick={onSave}
            loadingPosition="start"
            startIcon={<SaveOutlined/>}
            variant="text"
            disabled={!realtimeSettings?.amount || disabled}
          >
            Save changes
          </Button>
        </Box>
      </Grid>
    </div>
  )
}


const getState = (state) => ({
  requestsRealtime: state.requests.requestsRealtime
})

export default connect(
  getState,
  {
    setRequestsRealtime
  },
)(RequestsRealtimeSettings);
