import React from 'react'
import LoginForm from '../LoginForm/LoginForm'

export default class Login extends React.Component {

  onSubmit = (values) => {
    this.props.login(values.name, values.password, this.props.next)
  }
  
  render() {
    return <div><LoginForm onSubmit={this.onSubmit} /></div>
  }
};
