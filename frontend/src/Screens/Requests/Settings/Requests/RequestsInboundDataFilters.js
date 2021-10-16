import React from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Autocomplete, Checkbox, Grid, TextField} from "@mui/material";
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";
import {removeProject} from "../../../../Redux/Projects/projectActions";
import {useHistory} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";

const top100Films = [
  {title: 'The Shawshank Redemption', year: 1994},
  {title: 'The Godfather', year: 1972},
  {title: 'The Godfather: Part II', year: 1974},
  {title: 'The Dark Knight', year: 2008},
  {title: '12 Angry Men', year: 1957},
  {title: "Schindler's List", year: 1993},
  {title: 'Pulp Fiction', year: 1994},
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  {title: 'The Good, the Bad and the Ugly', year: 1966},
  {title: 'Fight Club', year: 1999},
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  {title: 'Forrest Gump', year: 1994},
  {title: 'Inception', year: 2010},
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  {title: "One Flew Over the Cuckoo's Nest", year: 1975},
  {title: 'Goodfellas', year: 1990},
  {title: 'The Matrix', year: 1999},
  {title: 'Seven Samurai', year: 1954},
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  {title: 'City of God', year: 2002},
  {title: 'Se7en', year: 1995},
  {title: 'The Silence of the Lambs', year: 1991},
  {title: "It's a Wonderful Life", year: 1946},
  {title: 'Life Is Beautiful', year: 1997},
  {title: 'The Usual Suspects', year: 1995},
  {title: 'Léon: The Professional', year: 1994},
  {title: 'Spirited Away', year: 2001},
  {title: 'Saving Private Ryan', year: 1998},
  {title: 'Once Upon a Time in the West', year: 1968},
  {title: 'American History X', year: 1998},
  {title: 'Interstellar', year: 2014},
];

const RequestsInboundDataFilters = () => {
  const classes = ProjectSettingsStyles();
  const history = useHistory();

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Inbound data filters'}/>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          size={'small'}
          key={history.location.key}
          multiple
          freeSolo
          className={'w-50'}
          options={top100Films}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox style={{marginRight: 8}} checked={selected}/>
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Methods"
              placeholder="Select from list or type custom"
              size={'small'}
              variant={'standard'}
              helperText={'Select methods which you want to exclude. For example if set to "GET", ' +
              '"POST", then requests with this methods wont be created.'}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Autocomplete
          size={'small'}
          key={history.location.key}
          multiple
          freeSolo
          className={'w-50'}
          options={top100Films}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, {selected}) => (
            <li {...props}>
              <Checkbox style={{marginRight: 8}} checked={selected}/>
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Status codes"
              placeholder="Select from list or type custom"
              size={'small'}
              variant={'standard'}
              helperText={'Select methods which you want to exclude. For example if set to "GET", ' +
              '"POST", then requests with this methods wont be created.'}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} className={'mt-3'}>
        <Box className={'position-relative'}>

        </Box>
      </Grid>
    </div>
  )
}


const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  {
    removeProject,
    setConfirmAction
  },
)(RequestsInboundDataFilters);
