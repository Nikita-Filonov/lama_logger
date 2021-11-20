import React from "react";
import {ProjectSettingsStyles} from "../../Styles/Screens";
import {ProjectSettingsHeader} from "../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import {connect} from "react-redux";
import FormControl from "@mui/material/FormControl";
import {setTheme} from "../../Redux/Users/usersActions";
import {useAlerts} from "../../Providers/AlertsProvider";
import {Add, Remove} from "@mui/icons-material";

const ThemeSettings = ({theme, setTheme}) => {
  const {setAlert} = useAlerts()
  const classes = ProjectSettingsStyles();

  const demoAlert = () => setAlert({message: 'Hello! This is demo alert', level: 'success'});
  const selectTheme = (event) => setTheme({...theme, themeMode: event.target.value});
  const onVertical = (event) => setTheme({...theme, snackbar: {...theme.snackbar, vertical: event.target.value}});
  const onHorizontal = (event) => setTheme({...theme, snackbar: {...theme.snackbar, horizontal: event.target.value}});
  const onTransition = (event) => setTheme({...theme, snackbar: {...theme.snackbar, transition: event.target.value}});
  const onStack = (maxStack) => setTheme({...theme, snackbar: {...theme.snackbar, maxStack}});

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Theme settings'}/>
      <Typography className={'mt-3'}>In this section you can change theme settings</Typography>
      <Grid item xs={12} className={'mt-3'}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Theme mode</FormLabel>
          <RadioGroup value={theme?.themeMode} onChange={selectTheme}>
            <FormControlLabel value="light" control={<Radio/>} label="Light mode"/>
            <FormControlLabel value="dark" control={<Radio/>} label="Dark mode"/>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Divider sx={{mt: 1, mb: 1}}/>

      <Typography className={'mt-3'}>Snackbar settings</Typography>

      <Grid item xs={12} className={'mt-3'}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Max stack</FormLabel>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton
              disabled={theme?.snackbar?.maxStack === 1}
              onClick={() => onStack(theme?.snackbar?.maxStack - 1)}
            >
              <Remove fontSize="small"/>
            </IconButton>
            <Typography sx={{ml: 1, mr: 1}}>{theme?.snackbar?.maxStack}</Typography>
            <IconButton
              disabled={theme?.snackbar?.maxStack === 10}
              onClick={() => onStack(theme?.snackbar?.maxStack + 1)}
            >
              <Add fontSize="small"/>
            </IconButton>
          </Box>
        </FormControl>
      </Grid>

      <Grid container spacing={2} sx={{mt: 1}}>

        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Vertical</FormLabel>
            <RadioGroup value={theme?.snackbar?.vertical} onChange={onVertical}>
              <FormControlLabel value="top" control={<Radio/>} label="Top"/>
              <FormControlLabel value="bottom" control={<Radio/>} label="Bottom"/>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Horizontal</FormLabel>
            <RadioGroup value={theme?.snackbar?.horizontal} onChange={onHorizontal}>
              <FormControlLabel value="left" control={<Radio/>} label="Left"/>
              <FormControlLabel value="center" control={<Radio/>} label="Center"/>
              <FormControlLabel value="right" control={<Radio/>} label="Right"/>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Transition</FormLabel>
            <RadioGroup value={theme?.snackbar?.transition} onChange={onTransition}>
              <FormControlLabel value="slide" control={<Radio/>} label="Slide"/>
              <FormControlLabel value="grow" control={<Radio/>} label="Grow"/>
              <FormControlLabel value="fade" control={<Radio/>} label="Fade"/>
              <FormControlLabel value="zoom" control={<Radio/>} label="Zoom"/>
              <FormControlLabel value="collapse" control={<Radio/>} label="Collapse"/>
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>

      <Grid item xs={12} className={'mt-3 mb-5'}>
        <Button variant={'outlined'} onClick={demoAlert}>Demo alert</Button>
      </Grid>
    </div>
  )
}

const getState = (state) => ({
  theme: state.users.theme,
})

export default connect(
  getState,
  {
    setTheme
  },
)(ThemeSettings);
