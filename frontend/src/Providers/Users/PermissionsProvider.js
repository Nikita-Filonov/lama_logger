import React, {useCallback, useContext, useMemo} from 'react';
import {useSelector} from "react-redux";


const PermissionsContext = React.createContext(null);

const PermissionsProvider = ({children}) => {

  const project = useSelector(state => state.projects.project);
  const user = useSelector(state => state.users.user);

  const me = useMemo(() => project?.members?.find(m => m?.user?.id === user?.id), [user, project]);
  const isAllowedSafe = useCallback(
    (actions) => {
      const permissions = me?.roles.map(r => r?.scope).flat(2);

      if (!permissions) {
        return;
      }

      return actions?.some(a => permissions.includes(a));
    },
    [me]
  )

  const isAllowed = (actions) => isAllowedSafe(actions);

  return (
    <PermissionsContext.Provider value={{isAllowed}}>
      {children}
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
