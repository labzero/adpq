import React from 'react'

export default class Login extends React.Component {

  render() {
    return <div onClick={() => this.props.login({id: 3333})}> Login form goes here</div>
  }
};
