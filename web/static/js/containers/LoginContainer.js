import { connect } from 'react-redux';
import { Login } from '../components'
import { loginUser } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (user) => {
    dispatch(loginUser(user));
  },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
