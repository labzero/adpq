import React, { Component, PropTypes } from 'react';
import * as RemoteDataStates from '../../../constants/RemoteDataStates';
import Loading from '../../Loading/Loading';

export default class OrderReport extends Component {
  static propTypes = {
    fetchOrder: PropTypes.func.isRequired,
    orderReport: PropTypes.shape(
      {
        items: PropTypes.array.isRequired,
        remoteDataState: PropTypes.string.isRequired
      }),
    byCategoryDepartment: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchOrder();
  }

  render() {
    if (this.props.orderReport.remoteDataState === RemoteDataStates.LOADED) {
      return (<div>{JSON.stringify(this.props.orderReport.items)} |
        {JSON.stringify(this.props.byCategoryDepartment)}
      </div>);
    }
    return <Loading />;
  }
}
