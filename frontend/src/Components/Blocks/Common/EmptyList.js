import * as React from 'react';
import {baseUrl} from "../../../Utils/Constants";
import {makeStyles} from "@mui/styles";
import {createTheme, Typography} from "@mui/material";


const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    label: {
      marginTop: theme.spacing(1),
      textAlign: 'center'
    },
    image: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '10%',
      marginTop: '10%'
    }
  }),
  {defaultTheme},
);

export const EmptyList = ({text, description = null}) => {
  const classes = useStyles();

  return (
    <div>
      <img className={classes.image} src={baseUrl + 'static/images/empty_list.png'}/>
      <div className={classes.label}>
        <Typography variant={'body1'} className={classes.label}>{text}</Typography>
        {description && <Typography variant={'caption'} className={classes.label}>{description}</Typography>}
      </div>
    </div>
  );
}
