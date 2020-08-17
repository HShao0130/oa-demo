import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './index.less';
import Layout from '../../framework/layout';
import { LayoutProps } from '../../framework/type';
import Login from './component/login';

class App extends React.Component<LayoutProps, any> {
  render() {
    return <Layout {...this.props}><Login /></Layout>;
  }
}

function bootstrap() {
  if (EASY_ENV_IS_NODE) {
    return App;
  }
  const state = window.__INITIAL_STATE__;
  const root = document.getElementById('app');
  if (EASY_ENV_IS_DEV) {
    ReactDOM.hydrate(<AppContainer><Login /></AppContainer>, root);
    if (module.hot) {
      module.hot.accept();
    }
  }
  ReactDOM.hydrate(<Login />, root);
}

export default bootstrap();
