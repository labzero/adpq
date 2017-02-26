import React, { PropTypes } from 'react';
import * as RemoteDataStates from '../../constants/RemoteDataStates';
import Item from '../Item/Item';

export default class ItemDetail extends React.Component {

  static propTypes = {
    item: PropTypes.object,
    fetchCatalog: PropTypes.func.isRequired,
    catalog: PropTypes.shape({
      remoteDataState: PropTypes.string.isRequired
    }).isRequired
  }

  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    const { item } = this.props;

    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      if (item) {
        return (
          <div className="usa-grid item-detail">
            <div className="usa-section">
              <h2>Product Detail</h2>
            </div>
            <Item item={item} />

            <div className="return-to-top"><a href="#top">Return to top</a></div>
          </div>
        );
      }
      return <div>No such item</div>;
    }
    return <div className="loading">Loading..</div>; // TODO replace with loading indicator component
  }
}
