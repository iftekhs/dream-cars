import { useEffect, useState } from 'react';
import { cl } from '../Helpers/Helpers';

const useToken = (email) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    if (email) {
      fetch(cl(`/jwt?email=${email}`))
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem('dreamcars-token', data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
