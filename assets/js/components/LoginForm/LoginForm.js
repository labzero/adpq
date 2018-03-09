import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import AlertsContainer from '../Alerts/AlertsContainer';

class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    passwordToggleLink: {
      input: 'password',
      text: 'Show Password'
    }
  }

  togglePasswordVisibility = (_event) => {
    if (this.state.passwordToggleLink.input === 'text') {
      this.setState({ passwordToggleLink: { text: 'Show Password', input: 'password' } });
    } else {
      this.setState({ passwordToggleLink: { text: 'Hide Password', input: 'text' } });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="usa-section">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-form-name">Username</label>
            <Field id="login-form-name" name="name" component="input" type="text" autoCorrect="off" autoCapitalize="off" required />
          </div>
          <div>
            <label htmlFor="login-form-password">Password</label>
            <Field id="login-form-password" name="password" component="input" type={this.state.passwordToggleLink.input} required />
            <div className="login-show-password">
              <button className="usa-button-unstyled" onClick={this.togglePasswordVisibility} type="button">
                {this.state.passwordToggleLink.text}
              </button>
            </div>
          </div>
          <button type="submit">Sign in</button>

          <AlertsContainer />

        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm);
