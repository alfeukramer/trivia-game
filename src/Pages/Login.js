import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { loginAction, tokenThunk } from '../redux/actions';
import '../style/Login.css';

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
    const { name, email } = this.state;
    await sendToken(name, email);
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
      <div className="login">
        <img src="https://i.ibb.co/7b6KyW0/tryvia.png" alt="logo" border="0" />
        {redirect && <Redirect to="/game" />}
        <form className="d-flex flex-column justify-content-center">
          <label htmlFor="name">
            Name
            <br />
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
            <br />
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <Button
            className="btn btn-info"
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.onClick }
          >
            Play
          </Button>
          <Link
            to="/settings"
            className="d-flex flex-column justify-content-center"
            style={ { textDecoration: 'none' } }
          >
            <Button
              className="btn btn-dark"
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendToken: (name, email) => dispatch(tokenThunk(name, email, loginAction)),
});

Login.propTypes = {
  sendToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
