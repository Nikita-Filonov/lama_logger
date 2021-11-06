import Box from "@mui/material/Box";

export const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{paddingTop: 3, paddingBottom: 3}}>
          {children}
        </Box>
      )}
    </div>
  );
}
