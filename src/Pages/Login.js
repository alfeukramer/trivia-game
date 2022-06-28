import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    this.buttonValidation();
  }

  handleChange({ target }) {
    const key = target.id;
    const { value } = target;
    this.setState({ [key]: value });
  }

  buttonValidation() {
    const { email, name, isDisabled } = this.state;
    const test1 = email.length > 0;
    const test2 = name.length > 0;
    if (test1 && test2 && isDisabled) {
      this.setState({ isDisabled: false });
    } else if (!isDisabled && (!test1 || !test2)) {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
