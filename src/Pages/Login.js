import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction, tokenThunk } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidUpdate() {
    this.buttonValidation();
  }

  async onClick() {
    const { sendToken } = this.props;
    await sendToken();
    this.setState({ redirect: true });
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
    const { name, email, isDisabled, redirect } = this.state;
    return (
      <div>
        {redirect && <Redirect to="/game" />}
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
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.onClick }
          >
            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
              >
                Configuração
              </button>
            </Link>
            Play
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendToken: () => dispatch(tokenThunk(loginAction)),
});

Login.propTypes = {
  sendToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
