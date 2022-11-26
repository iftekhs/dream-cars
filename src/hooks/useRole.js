import { useEffect, useState } from 'react';
import { cl } from '../Helpers/Helpers';

const useRole = (email) => {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    if (email) {
      fetch(cl(`/users/${email}`))
        .then((res) => res.json())
        .then((data) => {
          if (data.role) {
            setUserRole(data.role);
          }
        });
    }
  }, [email]);
  return [userRole];
};

export default useRole;
