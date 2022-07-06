import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/Header.css';

class Header extends React.Component {
  render() {
    const { email, name, score } = this.props;
    const userHash = md5(email).toString();
    return (
      <header
        className="header-game"
      >
        <img
          style={ { borderRadius: '25px' } }
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${userHash}` }
          alt="userImg"
        />
        <br />
        <span data-testid="header-player-name" className="text-center">
          <b>User</b>
          <br />
          {name}
        </span>
        <br />
        <span data-testid="header-score" className="text-center">
          <b>Score</b>
          <br />
          {score}
        </span>
        <div>
          <img src="https://i.ibb.co/7b6KyW0/tryvia.png" alt="logo" border="0" className="background-img" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  email: state.player.gravatarEmail,
  name: state.player.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
