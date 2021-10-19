import React, {useMemo} from "react";
import {useSettings} from "../../../../Providers/SettingsProvider";
import {Skeleton} from "@mui/lab";

export const ApiTokensSkeletons = () => {
  const {settings} = useSettings();

  const skeletonsCount = useMemo(() => Math.floor(window.innerHeight / 70), [])
  return (
    <div style={{width: '100%'}}>
      {new Array(skeletonsCount).fill().map((_, index) =>
        <Skeleton animation={settings.skeletonAnimation} key={index} width={'100%'} height={50}/>
      )}
    </div>
  )
}
