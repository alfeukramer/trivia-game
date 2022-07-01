const initialState = {
  name: '',
  assertions: 0,
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
    const { score, assertions } = state;
    const newScore = score + action.payload;
    const newAssertions = assertions + 1;
    return {
      ...state,
      score: newScore,
      assertions: newAssertions,

    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default player;
