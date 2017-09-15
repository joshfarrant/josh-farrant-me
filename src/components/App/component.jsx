import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.scss'

const App = () => (
  <div styleName="container">
    <h1 styleName="heading">Josh Farrant</h1>
    <h2 styleName="subheading">Full-Stack Javascript Developer</h2>
  </div>
);

export default CSSModules(App, styles);
