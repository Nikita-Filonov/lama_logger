import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import {useSelector} from "react-redux";


const PermissionsContext = React.createContext(null);

const PermissionsProvider = ({children, action}) => {

  const project = useSelector(state => state.projects.project);
  const user = useSelector(state => state.users.user);

  const me = useMemo(() => project?.members?.find(m => m?.user?.id === user?.id), [user, project]);
  const isAllowedSafe = useCallback(
    (action) => me?.roles.map(r => r?.scope).flat(2).includes(action),
    [me]
  )

  const allowed = useMemo(() => isAllowedSafe(action), [me, action]);
  const isAllowed = (action) => isAllowedSafe(action);

  return (
    <PermissionsContext.Provider value={{allowed, isAllowed}}>
      {children(allowed)}
    </PermissionsContext.Provider>
  );
};

const usePermissions = () => {
  const event = useContext(PermissionsContext);
  if (event == null) {
    throw new Error('usePermissions() called outside of a PermissionsProvider?');
  }
  return event;
};

export {PermissionsProvider, usePermissions};
