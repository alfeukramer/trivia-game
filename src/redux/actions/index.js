import md5 from 'crypto-js/md5';

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const loginAction = (token, name, email) => ({
  type: LOGIN_ACTION,
  payload: { token, name, email },
});

export const updateScore = (numero) => {
  console.log(numero);
  return {
    type: UPDATE_SCORE,
    payload: numero,
  };
};

export function tokenThunk(name, email, func) {
  return async (dispatch) => {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const json = await response.json();
    const { token } = json;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const userHash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${userHash}`;
    if (ranking) {
      const newRanking = [...ranking, { name, score: 0, picture }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      const newRanking = [{ name, score: 0, picture }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
    localStorage.setItem('token', token);
    dispatch(func(token, name, email));
  };
}
