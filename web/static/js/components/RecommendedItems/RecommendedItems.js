import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { catalogItemImage } from '../../lib/image_urls';
import { singleCategory } from '../../lib/category_item';
import { catalogItemPath } from '../../lib/paths';

const RecommendedItems = ({ title, subtitle, items }) => (
  <div className="homepage-recommendations">

    <div className="usa-width-one-half homepage-recommendations-description">
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>

    {items && items.length ?
      items.map(item => (
        <div className="usa-width-one-fourth homepage-recommendation" key={item.id}>
          <Link to={catalogItemPath(item)}>
            <img src={catalogItemImage(item)} alt={item.name} />
            <div className="homepage-recommendation-details">
              <div className="homepage-recommendation-category">{singleCategory(item.top_level_category)}</div>
              {item.name}
            </div>
          </Link>
        </div>
          )
      ) : ''
    }

  </div>
);

RecommendedItems.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  items: PropTypes.array
};

export default RecommendedItems;
