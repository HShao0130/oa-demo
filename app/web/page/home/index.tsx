
import React, { Component, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Layout from '../../framework/layout';
// https://github.com/gaearon/react-hot-loader/issues/525
import Home from './component/home';
import { LayoutProps, HomeProps } from '../../framework/type';

class App extends Component<LayoutProps & HomeProps, any> {
  render() {
    return <Layout {...this.props}><Home/></Layout>;
  }
}

function bootstrap() {
  if (EASY_ENV_IS_NODE) {
    return App;
  }
  const state = window.__INITIAL_STATE__;
  const root = document.getElementById('app');
  if (EASY_ENV_IS_DEV) {
    ReactDOM.hydrate(<AppContainer><Home/></AppContainer>, root);
    if (module.hot) {
      module.hot.accept();
    }
  }
  ReactDOM.hydrate(<Home/>, root);
}

export default bootstrap();