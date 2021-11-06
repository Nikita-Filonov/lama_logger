import React from "react";
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import {Skeleton} from "@mui/lab";
import {useSelector} from "react-redux";

export const ProjectsSkeletons = () => {
  const {skeletonAnimation} = useSelector(state => state.users.userSettings);

  return (
    <React.Fragment>
      {new Array(8).fill().map((_, index) =>
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardHeader
              title={<Skeleton animation={skeletonAnimation} height={12} width="100%"
                               style={{marginBottom: 6}}/>}
              subheader={<Skeleton animation={skeletonAnimation} height={12} width="100%"
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
