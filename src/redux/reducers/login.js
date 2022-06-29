const initialState = { token: '', name: '', email: '' };

const logRdc = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return {
      ...state,
    };
  }
};

export default logRdc;
