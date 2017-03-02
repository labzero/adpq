import { connect } from 'react-redux';
import keys from 'lodash/fp/keys';
import { formValueSelector, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import categories from '../../../lib/categories';
import ItemForm from './ItemForm';
import { updateItem } from '../../../actions';

const FORM_NAME = 'edit_item';

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(FORM_NAME);
  return {
    categories: keys(categories),
    subCategories: categories[selector(state, 'top_level_category')] || [],
    heading: 'Item Detail',
    subHeading: selector(state, 'name'),
    initialValues: ownProps.item
  };
};

const goToNext = (dispatch) => {
  dispatch(push('/admin/catalog'));
};

const form = reduxForm({
  form: FORM_NAME,
  onSubmit: (values, dispatch) => {
    dispatch(updateItem(values)).then(() => goToNext(dispatch));
  }
})(ItemForm);

export default connect(mapStateToProps)(form);
