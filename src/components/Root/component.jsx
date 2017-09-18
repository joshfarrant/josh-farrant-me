import React from 'react';
import CSSModules from 'react-css-modules';
import Stage from '../Stage';
import styles from './style.scss';

const Root = () => (
  <div styleName="container">
    <div styleName="header">
      <h2 styleName="heading">Josh Farrant</h2>
      <h3 styleName="subheading">Full-Stack Javascript Developer</h3>
    </div>
    <Stage>

    </Stage>
    <div styleName="footer">
      <h3>Some other info here</h3>
    </div>
  </div>
);

// <Stage>
//   <Triangle>
//     <div>
//       <h1>Back End</h1>
//       <p>Blah blah blah</p>
//     </div>
//   </Triangle>
//   <Triangle>
//     <div>
//       <h1>Front End</h1>
//       <p>Blah blah blah</p>
//     </div>
//   </Triangle>
//   <Triangle>
//     <div>
//       <h1>Native</h1>
//       <p>Blah blah blah</p>
//     </div>
//   </Triangle>
// </Stage>


export default CSSModules(Root, styles);
