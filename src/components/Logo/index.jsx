import React from 'react';
import styled from 'styled-components';
import logo from './logo-light.svg';

const StyledImg = styled.img`
  height: 100%;
  margin: 0;
  padding: 0;
`;

export default () => (
  <StyledImg
    src={logo}
    alt="Logo"
  />
);
