import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import map from 'lodash/fp/map';

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
      <div className="usa-section">
        <h1>
          {heading}
        </h1>
        <h2>
          {subHeading}
        </h2>
        <form onSubmit={handleSubmit}>
          <div>Category</div>
          <div>
            <label htmlFor="top_level_category">Top-Level</label>
            <Field name="top_level_category" component="select" required>
              <option />
              {map(opt => (<option key={opt} value={opt}>{opt}</option>), categories)}
            </Field>
          </div>

          <div>
            <label htmlFor="simple_category">Subcategory</label>
            <Field name="simple_category" component="select" required>
              <option />
              {map(opt => (<option key={opt} value={opt}>{opt}</option>), subCategories)}
            </Field>
          </div>
          <div>Item Information</div>
          <div>
            <label htmlFor="name">Item Name</label>
            <Field name="name" component="input" type="text" required />
          </div>
          <div>
            <label htmlFor="description">Item Description</label>
            <Field name="description" component="textarea" type="text" required />
          </div>
          <div>
            <label htmlFor="sku">SKU</label>
            <Field name="sku" component="input" type="text" required />
          </div>
          <div>
            <label htmlFor="clin">CLIN</label>
            <Field name="clin" component="input" type="text" required />
          </div>
          <div>
            <label htmlFor="unspc">UNSPS C Code</label>
            <Field name="unspc" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="manufacturer">Manufacturer (OEM)</label>
            <Field name="manufacturer" component="input" type="text" required />
          </div>
          <div>
            <label htmlFor="unit_of_measure">Unit of Measure</label>
            <Field name="unit_of_measure" component="input" type="text" required />
          </div>
          <div>
            <label htmlFor="quantity_in_uom">Qty in Unit of Measure</label>
            <Field name="quantity_in_uom" component="input" type="text" required />
          </div>
          <div>
            <label htmlFor="list_price">List Price/MSRP ($)</label>
            <Field name="list_price" component="input" type="text" required />
          </div>
          <div>
            <label htmlFor="contract_unit_price">Contract Unit Price ($)</label>
            <Field name="contract_unit_price" component="input" type="text" required />
          </div>

          <button type="reset">Cancel</button>
          <button type="submit">Save</button>

        </form>
      </div>
    );
  }
}
