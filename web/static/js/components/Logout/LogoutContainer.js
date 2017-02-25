import { connect } from 'react-redux';
import Logout from './Logout';
import { loginUser } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: (name, password, redirect) => {
    dispatch(loginUser(name, password, redirect));
  },
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
