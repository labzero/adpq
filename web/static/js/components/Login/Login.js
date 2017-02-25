import React, { PropTypes } from 'react';
import LoginForm from '../LoginForm/LoginForm';

export default class Login extends React.Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    next: PropTypes.string.isRequired
  }

  onSubmit = (values) => {
    this.props.login(values.name, values.password, this.props.next);
  }

  render() {
    return <div><LoginForm onSubmit={this.onSubmit} /></div>;
  }
}
