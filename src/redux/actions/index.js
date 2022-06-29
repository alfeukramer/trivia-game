export const LOGIN_ACTION = 'LOGIN_ACTION';

export const loginAction = (token, name, email) => ({
  type: LOGIN_ACTION,
  payload: { token, name, email },
});

export function tokenThunk(name, email, func) {
  return async (dispatch) => {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const json = await response.json();
    const { token } = json;
    localStorage.setItem('token', token);
    dispatch(func(token, name, email));
  };
}
