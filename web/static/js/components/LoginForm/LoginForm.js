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
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Username</label>
            <Field name="name" component="input" type="text" autoCorrect="off" autoCapitalize="off" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type={this.state.passwordToggleLink.input} />
            <div className="login-show-password"><a href="#show-password" onClick={this.togglePasswordVisibility}>{this.state.passwordToggleLink.text}</a></div>
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
