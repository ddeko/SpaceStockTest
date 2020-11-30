import React from 'react';
import { connect } from 'react-redux';
import MainNavigator from './MainNavigator';

class NavigatorView extends React.Component {

  render() {

    return <MainNavigator />
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
});

export default connect(mapStateToProps)(NavigatorView);