import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
require('dotenv').config()

class GoogleAuth extends React.Component {
  // Initializes the library
  componentDidMount() {
    const REACT_APP_GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;

    window.gapi.load('client:auth2', () => {
      // .init is async network request
      window.gapi.client.init({
        clientId: REACT_APP_GOOGLE_KEY,
        scope: 'email'
      }).then(() => {
        // code will only be executed once gapi library is ready to go
        this.auth = window.gapi.auth2.getAuthInstance();

        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // action creators
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
        <i className="google icon"></i>
        Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon"></i>
        Sign In with Google
        </button>
      );
    }
  }

  render() {
    return(
      <div> {this.renderAuthButton()} </div>
      );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
