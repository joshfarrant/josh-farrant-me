import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { MEDIA } from '../../utils/styles';

const rotateWords = keyframes`
  0%   { opacity: 1; height: 0px; animation-timing-function: ease-in; }
  10%  { opacity: 1; height: 60px; }
  28%  { opacity: 1; height: 60px; }
  33%  { opacity: 0; height: 60px; }
  100% { opacity: 0; }
`;

const animationDelay = 2.8;

const Spacer = styled.span`
  opacity: 0;
`;

const Container = styled.span`
  position: relative;
  margin-left: 9px;

  ${MEDIA.XSMALL(`
    margin-left: 5px;
  `)}
`;

const WordRotate = ({
  words,
}) => {
  const wordRotateSpans = words.reduce((a, c, i) => {
    if (i === 0) return a;
    return `
      ${a}
      & span:nth-child(${i + 1}) {
        animation-delay: ${animationDelay * i}s;
      }
    `;
  }, '');

  const WordsWrapper = styled.div`
    display: inline;

    & span {
      position: absolute;
      opacity: 0;
      overflow: hidden;
      width: auto;
      animation: ${rotateWords} ${words.length * animationDelay}s linear infinite 0s;
      left: 0;
    }
    ${wordRotateSpans}
  `;

  return (
    <Container>
      <Spacer>{words[0]}</Spacer>
      <WordsWrapper>
        {words.map(word => (
          <span
            key={word}
          >
            {word}
          </span>
        ))}
      </WordsWrapper>
    </Container>
  );
};

WordRotate.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
};

WordRotate.defaultProps = {
  words: [],
};

export default WordRotate;
