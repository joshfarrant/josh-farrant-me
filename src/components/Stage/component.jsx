import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Snap from 'snapsvg';
import { getTriangleSetCoordinate } from '../../helpers/utils';
import styles from './style.scss';

const TRIANGLES = [
  {
    label: ['Back', 'End'],
  }, {
    label: ['Front', 'End'],
  }, {
    label: ['Native'],
  },
];

class Stage extends Component {
  state = {
    paper: undefined,
  }

  componentDidMount() {
    const {
      CONTAINER_WIDTH,
      CONTAINER_HEIGHT,
      TRIANGLE_SIZE,
      TRIANGLE_Y,
      TRIANGLE_Y_OFFSET,
      TRIANGLE_MARGIN,
      stage,
    } = this;

    const paper = Snap(stage);
    paper.attr({
      viewBox: `0 0 ${CONTAINER_WIDTH} ${CONTAINER_HEIGHT}`,
    });

    const triangleCoords = getTriangleSetCoordinate(
      CONTAINER_WIDTH,
      CONTAINER_HEIGHT,
      TRIANGLES,
      TRIANGLE_SIZE,
      TRIANGLE_Y,
      TRIANGLE_Y_OFFSET,
      TRIANGLE_MARGIN,
    );

    console.debug('triangleCoords: ', triangleCoords);

    // Draw triangles
    const triangles = triangleCoords.map(({ vertices }) => (
      paper.polygon(...vertices).addClass(styles.triangle)
    ));

    triangleCoords.forEach(({ origin, rotation }, i) => {
      const text = paper.text(...origin, TRIANGLES[i].label);
      const { height, width, x, y } = text.getBBox();
      const adjustedX = x - (width / 2);
      const adjustedY = rotation === 180 ? y : (y + (height / 2));
      let widestTSpan = 0;
      text
        .attr({
          x: adjustedX,
          y: adjustedY,
          fontSize: 40,
        })
        .selectAll('tspan')
        .forEach((t, j) => {
          t.attr({
            x: adjustedX,
            y: adjustedY + (40 * j),
          });
        });
    });

    this.setState({ paper, triangles });
  }

  CONTAINER_WIDTH = 800
  CONTAINER_HEIGHT = 400
  TRIANGLE_SIZE = 220
  TRIANGLE_Y = 160
  TRIANGLE_Y_OFFSET = 10
  TRIANGLE_MARGIN = 10

  render() {
    return (
      <svg
        styleName="stage"
        ref={(node) => {
          this.stage = node;
        }}
      />
    );
  }
}

export default CSSModules(Stage, styles);
