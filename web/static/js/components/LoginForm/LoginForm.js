import React from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <Field name="name" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;
