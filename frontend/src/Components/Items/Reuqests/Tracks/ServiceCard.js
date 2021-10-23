import React from "react";
import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const ServiceCard = () => {
  return (
    <Card sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          dasdasdas
        </Typography>
        <Typography sx={{mb: 1.5}} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br/>
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
