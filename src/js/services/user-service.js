export const authUser = async (userData) => fetch('https://rsclone-back.herokuapp.com/auth',
  {
    method: 'POST',
    headers: {
      'content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      login: userData.name,
      password: userData.password,
    }),
  });

export const signUpUser = async (userData) => fetch('https://rsclone-back.herokuapp.com/newuser',
  {
    method: 'POST',
    headers: {
      'content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      name: userData.name,
      password: userData.password,
      preference: 'user',
    }),
  });

export const saveStatistics = async (statistics, token) => fetch('https://rsclone-back.herokuapp.com/userdata',
  {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: statistics,
    }),
  });

export const getStatistics = async (token) => fetch('https://rsclone-back.herokuapp.com/userdata',
  {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const saveMathStatistics = async (statistics, token) => fetch('https://rsclone-back.herokuapp.com/userdatam',
  {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: statistics,
    }),
  });

export const getMathStatistics = async (token) => fetch('https://rsclone-back.herokuapp.com/userdatam',
  {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
