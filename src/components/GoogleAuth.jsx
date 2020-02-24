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

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>IDK if were signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in</div>;
    } else {
      return <div>I am not signed in</div>;
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
