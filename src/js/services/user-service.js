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
