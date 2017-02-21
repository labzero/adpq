import React from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Logout extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    // dispatch the action that actually logs the user out here
    this.props.router.replace('/login')
  }
  render() {
    return null
  }
};

export default connect()(withRouter(Logout))
