const initialState = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  token: '',
};

const logRdc = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      token: action.payload.token,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  default:
    return {
      ...state,
    };
  }
};

export default logRdc;
