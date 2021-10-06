import * as React from 'react';
import {createTheme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';
import {baseUrl} from "../../Utils/Constants";


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
      width: '20%',
      marginTop: '10%'
    }
  }),
  {defaultTheme},
);

export const EmptyList = ({text}) => {
  const classes = useStyles();

  return (
    <div>
      <img className={classes.image} src={baseUrl + 'static/images/empty_list.png'}/>
      <div className={classes.label}>{text}</div>
    </div>
  );
}
