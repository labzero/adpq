import React, { PropTypes } from 'react';
import { shouldRender } from '../../lib/remote_data_states';
import RecommendedItems from '../RecommendedItems/RecommendedItems';
import Loading from '../Loading/Loading';

export default class Homepage extends React.Component {

  static propTypes = {
    fetchCatalog: PropTypes.func.isRequired,
    catalog: PropTypes.shape({
      remoteDataState: PropTypes.string.isRequired
    }).isRequired,
    recommendations: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    if (shouldRender(this.props.catalog.remoteDataState)) {
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
    return <Loading />;
  }
}
