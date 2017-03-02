import React, { Component, PropTypes } from 'react';
import Accordion from 'uswds/src/js/components/accordion';
import navInit from 'uswds/src/js/components/navigation';
import select from 'uswds/src/js/utils/select';
import HeaderDefaultContainer from './HeaderDefaultContainer';
import HeaderAdmin from './HeaderAdmin';
import HeaderLogin from './HeaderLogin';

class Header extends Component {
  static propTypes = {
    section: PropTypes.string,
    headerMode: PropTypes.string.isRequired
  }

  componentDidMount() {
    this.initUswds();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.headerMode !== this.props.headerMode) {
      this.initUswds();
    }
  }

  initUswds = () => {
    const accordions = select('.usa-accordion, .usa-accordion-bordered');
    accordions.forEach(el => new Accordion(el));
    navInit();
  }

  render() {
    if (this.props.headerMode === 'admin') {
      return (<HeaderAdmin section={this.props.section} />);
    } else if (this.props.headerMode === 'login') {
      return (<HeaderLogin section={this.props.section} />);
    }
    return (<HeaderDefaultContainer section={this.props.section} />);
  }
}

export default Header;
