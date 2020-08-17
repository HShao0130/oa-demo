import React, { Component } from 'react';
import './home.less';
// https://github.com/gaearon/react-hot-loader/issues/525
// must export, not export default
export default class Tab extends Component<{}> {
  render() {
    return <div>
      <header>杜小喵の小店</header>
    </div>;
  }
}