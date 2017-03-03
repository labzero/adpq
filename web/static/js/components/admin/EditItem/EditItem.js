import React, { Component, PropTypes } from 'react';
import EditItemFormContainer from '../ItemForm/EditItemFormContainer';
import * as RemoteDataStates from '../../../constants/RemoteDataStates';

export default class EditItem extends Component {

  static propTypes = {
    fetchCatalog: PropTypes.func.isRequired,
    catalog: PropTypes.shape({ remoteDataState: PropTypes.string.isRequired }),
    item: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED && this.props.item) {
      return <EditItemFormContainer item={this.props.item} />;
    }
    return <div>Loading..</div>;
  }
}
