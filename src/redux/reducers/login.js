const initialState = { token: '' };

const logRdc = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      token: action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default logRdc;
