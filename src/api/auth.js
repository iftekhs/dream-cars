import { cl } from '../Helpers/Helpers';

const setAuthToken = async (user) => {
  return fetch(cl(`/jwt`), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.accessToken) {
        localStorage.setItem('dream-accessToken', data.accessToken);
      }
      return data;
    });
};

export default setAuthToken;
