import React from 'react';
import styled from 'styled-components';
import Blurb from '../components/Blurb';
import Hero from '../components/Hero';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const StyledHeroContainer = styled.div`
  flex: 3;
`;

const StyledBlurbContainer = styled.div`
  flex: 2;
`;

export default ({
  data,
}) => (
  <Container>
    <StyledHeroContainer>
      <Hero
        backgroundImage={data.backgroundImage}
        profileImage={data.profileImage}
      />
    </StyledHeroContainer>
    <StyledBlurbContainer>
      <Blurb />
    </StyledBlurbContainer>
  </Container>
);

export const query = graphql`
  query BackgroundImageQuery {
    backgroundImage: imageSharp(id: { regex: "/graffiti/" }) {
      sizes(maxWidth: 2800) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    profileImage: imageSharp(id: { regex: "/headshot/" }) {
      resolutions(width: 256) {
        ...GatsbyImageSharpResolutions_withWebp
      }
    }
  }
`;
