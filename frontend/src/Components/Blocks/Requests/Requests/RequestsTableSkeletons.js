import React, {useMemo} from "react";
import {Skeleton} from "@mui/lab";
import {useSettings} from "../../../../Providers/SettingsProvider";

export const RequestsTableSkeletons = () => {
  const {settings} = useSettings();

  const skeletonsCount = useMemo(() => Math.floor((window.innerHeight - 170) / 50), [])
  return (
    <div style={{width: '100%'}}>
      {new Array(skeletonsCount).fill().map((_, index) =>
        <Skeleton animation={settings.skeletonAnimation} key={index} width={'100%'} height={50}/>
      )}
    </div>
  )
}
