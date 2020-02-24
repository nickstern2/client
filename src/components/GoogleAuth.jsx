import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null }
  // Initializes the library
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      // .init is async network request
      window.gapi.client.init({
        clientId: '745524184174-6o34415o3e80e7mt45djb19jv09eduhl.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // code will only be executed once gapi library is ready to go
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
        <i className="google icon"></i>
        Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
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

export default GoogleAuth;

// clientId
// 745524184174-6o34415o3e80e7mt45djb19jv09eduhl.apps.googleusercontent.com
