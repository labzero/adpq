import { connect } from 'react-redux';
import Alerts from './Alerts';

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
