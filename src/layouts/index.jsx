import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import 'typeface-lato';
import './index.css';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { DOCUMENT, META_TAGS } from '../utils/strings';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.header`
  width: 100%;
  flex: 0 0 60px;
`;

const StyledMain = styled.main`
  width: 100%;
  flex: 1;
`;

const StyledFooter = styled.footer`
  width: 100%;
  flex: 0 0 60px;
`;

const TemplateWrapper = ({ children }) => (
  <Container>
    <Helmet
      title={DOCUMENT.TITLE}
      meta={META_TAGS}
    >
      <html lang="en" />
    </Helmet>
    <StyledHeader>
      <Nav />
    </StyledHeader>
    <StyledMain>
      {children()}
    </StyledMain>
    <StyledFooter>
      <Footer />
    </StyledFooter>
  </Container>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TemplateWrapper;
