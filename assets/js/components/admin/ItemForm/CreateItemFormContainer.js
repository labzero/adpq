import { connect } from 'react-redux';
import keys from 'lodash/fp/keys';
import { push } from 'react-router-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import categories from '../../../lib/categories';
import ItemForm from './ItemForm';
import { createItem } from '../../../actions';

const FORM_NAME = 'add_item';

const mapStateToProps = (state, _ownProps) => {
  const selector = formValueSelector(FORM_NAME);
  return {
    categories: keys(categories),
    subCategories: categories[selector(state, 'top_level_category')] || [],
    heading: 'Add Item',
    subHeading: 'New Item'
  };
};

const goToNext = (dispatch) => {
  dispatch(push('/admin/catalog'));
};

const form = reduxForm({
  form: FORM_NAME,
  initialValues: {},
  onSubmit: (values, dispatch) => {
    dispatch(createItem(values)).then(() => goToNext(dispatch));
  } })(ItemForm);

export default connect(mapStateToProps)(form);
