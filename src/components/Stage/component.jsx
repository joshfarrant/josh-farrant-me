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

    snap
      .polygon(
        getEquilateralTriangleCoordinates(100, 100, 100, 0),
      )
      .addClass(styles.triangle);

    snap
      .polygon(
        getEquilateralTriangleCoordinates(160, 100, 100, 180, true),
      )
      .addClass(styles.triangle);

    snap
      .polygon(
        getEquilateralTriangleCoordinates(220, 100, 100, 0),
      )
      .addClass(styles.triangle);
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
