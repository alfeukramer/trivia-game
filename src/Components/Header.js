import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, name } = this.props;
    const userHash = md5(email).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${userHash}` }
          alt="userImg"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.logRdc.player.gravatarEmail,
  name: state.logRdc.player.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
