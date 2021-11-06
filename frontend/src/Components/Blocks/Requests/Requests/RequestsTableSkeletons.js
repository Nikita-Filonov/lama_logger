import React, {useMemo} from "react";
import {Skeleton} from "@mui/lab";
import {useSelector} from "react-redux";

export const RequestsTableSkeletons = () => {
  const {skeletonAnimation} = useSelector(state => state.users.userSettings);

  const skeletonsCount = useMemo(() => Math.floor((window.innerHeight - 170) / 50), [])
  return (
    <div style={{width: '100%'}}>
      {new Array(skeletonsCount).fill().map((_, index) =>
        <Skeleton animation={skeletonAnimation} key={index} width={'100%'} height={50}/>
      )}
    </div>
  )
}
