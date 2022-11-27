import { useEffect, useState } from 'react';
import { cl } from '../Helpers/Helpers';

const useRole = (email) => {
  const [userRole, setUserRole] = useState(null);
  const [userRoleLoading, setUserRoleLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(cl(`/users/${email}`))
        .then((res) => res.json())
        .then((data) => {
          if (data.role) {
            setUserRole(data.role);
          }
          setUserRoleLoading(false);
        });
    }
  }, [email]);
  return [userRole, userRoleLoading];
};

export default useRole;
