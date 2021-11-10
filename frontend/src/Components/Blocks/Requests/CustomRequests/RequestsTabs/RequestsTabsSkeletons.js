import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {Skeleton} from "@mui/material";

export const RequestsTabsSkeletons = () => {
  const {skeletonAnimation} = useSelector(state => state.users.userSettings);

  const skeletonsCount = useMemo(() => Math.floor((window.innerWidth / 1.2) / 100), [])

  return (
    <div style={{width: '100%', display: 'flex'}}>
      {new Array(skeletonsCount).fill().map((_, index) =>
        <Skeleton animation={skeletonAnimation} key={index} width={100} height={28} sx={{ml: 1, mr: 1}}/>
      )}
    </div>
  )
}
