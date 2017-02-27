import React, { PropTypes } from 'react';
import * as RemoteDataStates from '../../constants/RemoteDataStates';
import RecommendedItems from '../RecommendedItems/RecommendedItems';

export default class Homepage extends React.Component {

  static propTypes = {
    fetchCatalog: PropTypes.func.isRequired,
    catalog: PropTypes.shape({
      remoteDataState: PropTypes.string.isRequired
    }).isRequired,
    recommendations: PropTypes.shape.isRequired
  }

  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      return (
        <div className="usa-grid homepage">

          <div className="usa-section">
            <h2>Desktop or laptop?</h2>
            <p className="subheading">Options and pricing for every hardware need.</p>
          </div>

          <div>
            <h3 className="subsection">Popular Configurations</h3>

            {this.props.recommendations && this.props.recommendations.length ?
              this.props.recommendations.map(recommendation => (
                <RecommendedItems {...recommendation} />
                )) : ''
            }

          </div>

          <div className="return-to-top"><a href="#top">Return to top</a></div>
        </div>
      );
    }
    return <div className="loading">Loading..</div>;
  }
}
