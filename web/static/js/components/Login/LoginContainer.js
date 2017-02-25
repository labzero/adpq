import { connect } from 'react-redux';
import Login from './Login';
import { loginUser } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const query = ownProps.location.query;
  return {
    next: query.next
  };
};

const mapDispatchToProps = dispatch => ({
  login: (name, password, redirect) => {
    dispatch(loginUser(name, password, redirect));
  },
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
