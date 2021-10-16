import React from "react";
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import {Skeleton} from "@mui/lab";
import {useSettings} from "../../../Providers/SettingsProvider";

export const ProjectsSkeletons = () => {
  const {settings} = useSettings();

  return (
    <React.Fragment>
      {new Array(8).fill().map((_, index) =>
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardHeader
              title={<Skeleton animation={settings.skeletonAnimation} height={12} width="100%"
                               style={{marginBottom: 6}}/>}
              subheader={<Skeleton animation={settings.skeletonAnimation} height={12} width="100%"
                                   style={{marginBottom: 6}}/>}
            />
            <CardContent>
              <Skeleton height={120}/>
            </CardContent>
            <CardActions>
              <Skeleton width={'100%'} height={40}/>
            </CardActions>
          </Card>
        </Grid>
      )}
    </React.Fragment>
  )
}
