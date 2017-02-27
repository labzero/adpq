import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    passwordInput: 'password'
  }

  togglePassword = _event => (
      this.setState(prevState => ({ passwordInput: (prevState.passwordInput === 'password' ? 'text' : 'password') }))
  )

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="usa-section">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Username or email address</label>
            <Field name="name" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type={this.state.passwordInput} />
            <div className="login-show-password"><a href="#show-password" onClick={this.togglePassword}>Show password</a></div>
          </div>
          <button type="submit">Sign in</button>

          <p><a href="#">Forgot username?</a></p>
          <p><a href="#">Forgot password?</a></p>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm);
