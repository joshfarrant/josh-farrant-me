import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import ProfileImage from '../ProfileImage';
import WordRotate from '../WordRotate';
import { COLORS, FONT_WEIGHT, MEDIA } from '../../utils/styles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${COLORS.BLACK};
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled(Img)`
  width: 100%;
  opacity: 0.2;
  top: 0;
  left: 0;
  position: absolute;
  transition: filter 0.3s ease;
  filter: blur(${props => (props.imageLoaded ? '0' : '6px')}) !important;

  & > img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: 50% 35% !important;
    filter: saturate(200%) contrast(120%) brightness(110%);
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;

  transition: padding 0.3s ease;

  ${MEDIA.XSMALL(`
    padding: 20px 0 10px 0;
  `)}
`;

const ProfileImageContainer = styled.div`
  position: relative;
`;

const HeadingContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heading = styled.h1`
  color: ${COLORS.WHITE};
  letter-spacing: 1.5px;
  transition: font-size 0.3s ease;

  ${MEDIA.SMALL(`
    font-size: 32px;
  `)}

  ${MEDIA.XSMALL(`
    font-size: 20px;
    margin-bottom: 13px;
  `)}
`;

const Strong = styled.strong`
  font-weight: ${FONT_WEIGHT.LIGHT};
  color: ${COLORS.PRIMARY};
`;

export default class Hero extends Component {
  static propTypes = {
    backgroundImage: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    profileImage: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  constructor(props) {
    super(props);
    this.state = {
      backgroundImageLoaded: false,
    };
  }

  render() {
    const { backgroundImageLoaded } = this.state;
    return (
      <Container>
        <BackgroundImage
          alt="Graffiti"
          sizes={this.props.backgroundImage.sizes}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          onLoad={() => {
            this.setState({
              backgroundImageLoaded: true,
            });
          }}
          imageLoaded={backgroundImageLoaded}
        />
        <Content>
          <ProfileImageContainer>
            <ProfileImage
              image={this.props.profileImage}
            />
          </ProfileImageContainer>
          <HeadingContainer>
            <Heading>
              Hello, I&#39;m <Strong>Josh</Strong>.
            </Heading>
            <Heading>
              I&#39;m a JavaScript
              <WordRotate
                words={[
                  'Developer',
                  'Consultant',
                  'Blogger',
                ]}
              />
            </Heading>
          </HeadingContainer>
        </Content>
      </Container>
    );
  }
}
