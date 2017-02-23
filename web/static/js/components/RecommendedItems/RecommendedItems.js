import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const RecommendedItems = ({title, subtitle, items}) => (
  <div className="homepage-recommendations">

    <div className="usa-width-one-half homepage-recommendations-description">
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>

    {items && items.length ?
      items.map((item, i) => (
              <div className="usa-width-one-fourth homepage-recommendation" key={i}>
                <Link to={`/item/${item.id}`}>
                  <img src={`${item.image}`} />
                  <div className="homepage-recommendation-details">
                    <div className="homepage-recommendation-category">{item.top_level_category}</div>
                    {item.description}
                  </div>
                </Link>
              </div>
          )
      ) : ''
    }

  </div>
);

RecommendedItems.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  items: React.PropTypes.array
};

export default RecommendedItems;
