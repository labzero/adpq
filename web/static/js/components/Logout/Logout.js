import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUser } from '../../actions';

class Logout extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.logout();
    this.props.router.replace('/login');
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUser());
  },
  dispatch
});

export default connect(null, mapDispatchToProps)(withRouter(Logout));
