import { connect } from 'react-redux';
import { ItemDetail } from '../components'

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id
  }
}

export default connect(mapStateToProps)(ItemDetail);
