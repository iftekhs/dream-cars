function cl(link) {
  return process.env.REACT_APP_API_ROOT + link;
}

const setAuthToken = (user) => {
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

export { cl, setAuthToken };
