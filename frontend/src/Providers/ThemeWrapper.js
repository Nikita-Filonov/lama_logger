import React, {useMemo} from "react";
import {connect} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const ThemeWrapper = ({children, theme}) => {

  const safeTheme = useMemo(() => theme?.themeMode || 'light', [theme]);

  const darkTheme = createTheme({
    palette: {
      mode: safeTheme,
      ...(safeTheme === 'light'
        ? {}
        : {
          background: {
            default: '#2B2B2B',
            paper: '#2B2B2B'
          },
        }),
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  )
}
const getState = (state) => ({
  theme: state.users.theme
})

export default connect(
  getState,
  null,
)(ThemeWrapper);
