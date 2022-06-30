const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  token: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case 'UPDATE_SCORE': {
    const { score } = state;
    const newScore = score + action.payload;
    return {
      ...state,
      score: newScore,
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default player;
