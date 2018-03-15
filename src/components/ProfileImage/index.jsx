import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { COLORS, MEDIA } from '../../utils/styles';

const SIZES = {
  SMALL: '64px',
  MEDIUM: '96px',
  LARGE: '128px',
};

const Container = styled.div`
  width: ${SIZES.LARGE};
  height: ${SIZES.LARGE};
  position: relative;
  margin-bottom: 30px;
  transition: width 0.3s ease,
              height 0.3s ease,
              margin 0.3s ease;

  ${MEDIA.SMALL(`
    width: ${SIZES.MEDIUM};
    height: ${SIZES.MEDIUM};
    margin-bottom: 20px;
  `)}

  ${MEDIA.XSMALL(`
    width: ${SIZES.SMALL};
    height: ${SIZES.SMALL};
    margin-bottom: 10px;
  `)}
`;

const Border = styled.div`
  width: ${SIZES.LARGE};
  height: ${SIZES.LARGE};
  border-radius: 128px;
  border: 4px solid ${COLORS.RED};
  position: absolute;
  top: 0;
  left: 0;
  transition: border-width 0.3s ease;
  z-index: 10;

  ${MEDIA.SMALL(`
    width: ${SIZES.MEDIUM};
    height: ${SIZES.MEDIUM};
    border-width: 4px;
  `)}

  ${MEDIA.XSMALL(`
    width: ${SIZES.SMALL};
    height: ${SIZES.SMALL};
    border-width: 2px;
  `)}
`;

const Image = styled(Img)`
  width: ${SIZES.LARGE} !important;
  height: ${SIZES.LARGE} !important;
  border-radius: ${SIZES.LARGE} !important;

  ${MEDIA.SMALL(`
    width: ${SIZES.MEDIUM} !important;
    height: ${SIZES.MEDIUM} !important;
  `)}

  ${MEDIA.XSMALL(`
    width: ${SIZES.SMALL} !important;
    height: ${SIZES.SMALL} !important;
  `)}

  & > img {
    filter: blur(${props => (props.imageLoaded ? '0' : '8px')}) !important;
    transition: filter 0.3s ease;
    border-radius: 128px;
  }
`;

export default class ProfileImage extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
    };
  }

  render() {
    return (
      <Container>
        <Border />
        <Image
          alt="Profile"
          resolutions={this.props.image.resolutions}
          onLoad={() => {
            this.setState({
              imageLoaded: true,
            });
          }}
          imageLoaded={this.state.imageLoaded}
        />
      </Container>
    );
  }
}
