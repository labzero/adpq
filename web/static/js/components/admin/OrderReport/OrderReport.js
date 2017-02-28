import React, { Component, PropTypes } from 'react';
import * as RemoteDataStates from '../../../constants/RemoteDataStates';

export default class OrderReport extends Component {
  static propTypes = {
    fetchOrders: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    if (this.props.orderReport.remoteDataState === RemoteDataStates.LOADED) {
      return <div>{JSON.stringify(this.props.orderReport.items)}</div>
    }
    return <div>Loading..</div>;
  }
}
