const initialState = { a: 'a' };

const logRdc = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      a: action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default logRdc;
