import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {Skeleton} from "@mui/lab";

export const RequestsHistorySkeletons = () => {
  const {skeletonAnimation} = useSelector(state => state.users.userSettings);

  const skeletonsCount = useMemo(() => Math.floor((window.innerHeight / 1.50) / 51), [])

  return (
    <div style={{width: '100%'}}>
      {new Array(skeletonsCount).fill().map((_, index) =>
        <Skeleton animation={skeletonAnimation} key={index} width={'100%'} height={49}/>
      )}
    </div>
  )
}
