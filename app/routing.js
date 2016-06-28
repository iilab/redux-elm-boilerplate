import React from 'react';
import { connect } from 'react-redux';
import { forwardTo } from 'redux-elm';
import { Router, Route, IndexRoute } from 'react-router';

// import required components
import HomePage from './pages/home-page/view';
import Template from './template';

/**
 * Prepare component for router
 * @param {View} View - imported view component class/name
 * @param {string} modelKey - key used in root reducer inside src/root/updater.js
 * @param {string} ...nesting - action name/identifier for component
 */
const connectView = (View, modelKey, ...nesting) =>
  connect(appState => ({ model: appState.root[modelKey] }))(
    props => <View {...props} dispatch={forwardTo(props.dispatch, ...nesting)} />);

// TODO: Define all pages available for routing
const Home = connectView(HomePage, 'homePage', 'HomePage');
const Home2 = connectView(HomePage, 'homePage2', 'HomePage2');

// TODO: Define routes for your App
// they will be used by app/pages/root/view.js
export default history => (
  <Router history={history}>
    <Route path="/" component={Template}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="home2" component={Home2} />
    </Route>
  </Router>
);
