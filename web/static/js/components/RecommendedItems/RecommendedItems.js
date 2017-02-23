import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const RecommendedItems = ({key, title, subtitle, items}) => (
  <div className="recommendations">

    <div className="usa-width-one-half">
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>

    {items && items.length ?
      items.map((item, i) => (
              <div className="usa-width-one-fourth" key={i}>
                <Link to={`/item/${item.id}`} className="recommendation">
                  <img src={`${item.image}`} />
                  <div className="recommendation-details">
                    <div className="recommendation-category">{item.top_level_category}</div>
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
  //item: PropTypes.object.isRequired
};

export default RecommendedItems;
