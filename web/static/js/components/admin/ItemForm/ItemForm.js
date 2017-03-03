import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import map from 'lodash/fp/map';
import { Link } from 'react-router';

export default class ItemForm extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    subCategories: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render() {
    const { handleSubmit, heading, subHeading, categories, subCategories } = this.props;
    return (
      <div>
        <div className="usa-section">
          <h2>
            {heading}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="item-form-subheading-section">
            <h3 className="item-form-subheading">
              {subHeading}
            </h3>
            <div className="item-form-actions">
              <Link to="/admin/catalog" className="usa-button usa-button-outline">Cancel</Link>
              <button>Save</button>
            </div>
          </div>
          <fieldset className="item-form-fieldset">
            <legend className="subsection item-form-legend">Category</legend>
            <div>
              <label className="usa-input-required" htmlFor="top_level_category">Top-Level</label>
              <Field name="top_level_category" component="select" required>
                <option />
                {map(opt => (<option key={opt} value={opt}>{opt}</option>), categories)}
              </Field>
            </div>

            <div>
              <label className="usa-input-required" htmlFor="simple_category">Subcategory</label>
              <Field name="simple_category" component="select" required>
                <option />
                {map(opt => (<option key={opt} value={opt}>{opt}</option>), subCategories)}
              </Field>
            </div>
          </fieldset>
          <fieldset className="item-form-fieldset">
            <legend className="subsection item-form-legend">Item Information</legend>
            <div>
              <label className="usa-input-required" htmlFor="name">Item Name</label>
              <Field name="name" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="description">Item Description</label>
              <Field name="description" component="textarea" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="sku">SKU</label>
              <Field name="sku" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="clin">CLIN</label>
              <Field name="clin" component="input" type="text" required />
            </div>
            <div>
              <label htmlFor="unspc">UNSPS C Code</label>
              <Field name="unspc" component="input" type="text" />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="manufacturer">Manufacturer (OEM)</label>
              <Field name="manufacturer" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="unit_of_measure">Unit of Measure</label>
              <Field name="unit_of_measure" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="quantity_in_uom">Qty in Unit of Measure</label>
              <Field name="quantity_in_uom" component="input" type="text" required pattern="\d+" />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="list_price">List Price/MSRP ($)</label>
              <Field name="list_price" component="input" type="text" required pattern="\d+\.?\d{0,2}" />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="contract_unit_price">Contract Unit Price ($)</label>
              <Field name="contract_unit_price" component="input" type="text" required pattern="\d+\.?\d{0,2}" />
            </div>
          </fieldset>

          <div className="item-form-actions-bottom">
            <div className="item-form-actions">
              <Link to="/admin/catalog" className="usa-button usa-button-outline">Cancel</Link>
              <button>Save</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}
