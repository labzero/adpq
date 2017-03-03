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
          <h1>
            {heading}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="item-form-subheading-section">
            <h2 className="item-form-subheading">
              {subHeading}
            </h2>
            <div className="item-form-actions">
              <Link to="/admin/catalog" className="usa-button usa-button-outline">Cancel</Link>
              <button>Save</button>
            </div>
          </div>
          <fieldset className="item-form-fieldset">
            <legend className="subsection item-form-legend">Category</legend>
            <div>
              <label className="usa-input-required" htmlFor="item-form-top_level_category">Top-Level</label>
              <Field id="item-form-top_level_category" name="top_level_category" component="select" required>
                <option />
                {map(opt => (<option key={opt} value={opt}>{opt}</option>), categories)}
              </Field>
            </div>

            <div>
              <label className="usa-input-required" htmlFor="item-form-simple_category">Subcategory</label>
              <Field id="item-form-simple_category" name="simple_category" component="select" required>
                <option />
                {map(opt => (<option key={opt} value={opt}>{opt}</option>), subCategories)}
              </Field>
            </div>
          </fieldset>
          <fieldset className="item-form-fieldset">
            <legend className="subsection item-form-legend">Item Information</legend>
            <div>
              <label className="usa-input-required" htmlFor="item-form-name">Item Name</label>
              <Field id="item-form-name" name="name" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-description">Item Description</label>
              <Field id="item-form-description" name="description" component="textarea" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-sku">SKU</label>
              <Field id="item-form-sku" name="sku" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-clin">CLIN</label>
              <Field id="item-form-clin" name="clin" component="input" type="text" required />
            </div>
            <div>
              <label htmlFor="item-form-unspc">UNSPS C Code</label>
              <Field id="item-form-unspc" name="unspc" component="input" type="text" />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-manufacturer">Manufacturer (OEM)</label>
              <Field id="item-form-manufacturer" name="manufacturer" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-unit_of_measure">Unit of Measure</label>
              <Field id="item-form-unit_of_measure" name="unit_of_measure" component="input" type="text" required />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-quantity_in_uom">Qty in Unit of Measure</label>
              <Field id="item-form-quantity_in_uom" name="quantity_in_uom" component="input" type="text" required pattern="\d+" />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-list_price">List Price/MSRP ($)</label>
              <Field id="item-form-list_price" name="list_price" component="input" type="text" required pattern="\d+\.?\d{0,2}" />
            </div>
            <div>
              <label className="usa-input-required" htmlFor="item-form-contract_unit_price">Contract Unit Price ($)</label>
              <Field id="item-form-contract_unit_price" name="contract_unit_price" component="input" type="text" required pattern="\d+\.?\d{0,2}" />
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
