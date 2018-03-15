import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  buildKeyframes,
  COLORS,
  FONT_WEIGHT,
  MEDIA,
} from '../../utils/styles';

const flashColors = [
  COLORS.GREEN,
  COLORS.BLUE,
  COLORS.PINK,
  COLORS.RED,
];

const hoverAnimation = keyframes`
  ${buildKeyframes(flashColors, 'background', false)}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;

  padding: 100px 0;
  transition: padding 0.3s ease;

  ${MEDIA.SMALL(`
    padding: 60px 0;
  `)}

  ${MEDIA.XSMALL(`
    padding: 40px 0;
  `)}
`;

const Paragraph = styled.p`
  text-align: center;
  font-weight: ${FONT_WEIGHT.BOLD};
  max-width: 742px;
  letter-spacing: 1.1px;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 28px;
  color: ${COLORS.DARKEST_GREY};
  margin: 0;

  ${MEDIA.SMALL(`
    font-size: 16px;
    line-height: 24px;
  `)}

  ${MEDIA.XSMALL(`
    font-size: 14px;
    line-height: 20px;
  `)}
`;

const linkStyles = `
  padding: 0 4px;
  margin: 0 1px;
  color: ${COLORS.DARKEST_GREY};
  background: ${COLORS.PRIMARY};
  transition: color 0.3s ease,
              background-color 0.3s ease;

  &:hover {
    color: ${COLORS.DARKEST_GREY};
    background: ${COLORS.DARKEST_GREY};
    animation: ${hoverAnimation} 1.2s linear infinite;
  }
`;

const StyledAnchor = styled.a`
  ${linkStyles}
`;

export default () => {
  const links = {
    nimvelo: (
      <StyledAnchor
        href="https://www.nimvelo.com/"
        target="_blank"
        rel="noopener"
      >
        Nimvelo
      </StyledAnchor>
    ),
    clicky: (
      <StyledAnchor
        href="https://github.com/joshfarrant/slack-clicky"
        target="_blank"
        rel="noopener"
      >
        #Clicky
      </StyledAnchor>
    ),
  };

  /* eslint-disable max-len */
  return (
    <Container>
      <Paragraph>
        I&#39;m a Senior Front-End Developer at {links.nimvelo}. In my spare time I build web apps, automate things, and work on {links.clicky}. I also do freelance web development work and JavaScript consulting. If you&#39;d like to work together to build something amazing, get in touch.
      </Paragraph>
    </Container>
  );
  /* eslint-enable max-len */
};
