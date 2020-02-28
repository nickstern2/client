import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
  componentDidMount() {
    // this.props.fetchStream(this.props.match.params.id).then(() => {
    //   console.log(this.props);
    //   console.log(this.props.streams[0].title);
    // })
    this.props.fetchStream(this.props.match.params.id);
  }

  onDeleteStream = (props) => {
    this.props.deleteStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      // Invisible tag -- nothing rendered to the DOM
      // Div threw off styling
      <React.Fragment>
        <button onClick={this.onDeleteStream} className="ui button negative">Delete</button>
        <Link to='/' className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }

    return `Are you sure you want to delete ${this.props.stream.title}`
  }

  render() {
    return(
        <Modal
          title='Delete Stream'
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { deleteStream: deleteStream, fetchStream: fetchStream })(StreamDelete);
