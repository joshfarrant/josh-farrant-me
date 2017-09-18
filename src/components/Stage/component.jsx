import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Snap from 'snapsvg';
import { getEquilateralTriangleCoordinates } from '../../helpers/utils';
import styles from './style.scss';

class Stage extends Component {
  state = {
    snap: undefined,
  }

  componentDidMount() {
    const { stage } = this;
    const snap = Snap(stage);

    const triangleCoords = getEquilateralTriangleCoordinates(100, 100, 100, 50);

    const triangle = snap.polygon(triangleCoords);
    triangle.addClass(styles.triangle);
  }

  render() {
    return (
      <svg
        styleName="stage"
        viewBox="0 0 300 300"
        ref={(node) => {
          this.stage = node;
        }}
      />
    );
  }
}

export default CSSModules(Stage, styles);
