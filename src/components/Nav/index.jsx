import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'gatsby-link';
import Logo from '../Logo';
import { COLORS, MEDIA } from '../../utils/styles';

const hoverAnimation = keyframes`
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
`;

// const links = [
//   {
//     label: 'About',
//     to: '/about',
//     color: COLORS.GREEN,
//   }, {
//     label: 'Work',
//     to: '/work',
//     color: COLORS.BLUE,
//   }, {
//     label: 'Contact',
//     to: '/contact',
//     color: COLORS.RED,
//   },
// ];

const HEIGHT = '60px';

const Container = styled.nav`
  width: 100%;
  min-height: ${HEIGHT};
  background: ${COLORS.BLACK};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${MEDIA.XSMALL(`
    flex-direction: column;
    justify-content: center;
  `)}
`;

const Left = styled(Link)`
  height: ${HEIGHT};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding-left: 10px;
  box-sizing: border-box;

  &:hover {
    animation: ${hoverAnimation} 1.5s linear infinite;
  }

  ${MEDIA.XSMALL(`
    width: 100%;
    height: 40px;
    justify-content: center;
  `)}
`;

// const Right = styled.div`
//   height: ${HEIGHT};
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;

//   ${MEDIA.XSMALL(`
//     width: 100%;
//     height: 40px;
//     justify-content: space-around;
//   `)}
// `;

const LogoContainer = styled.div`
  height: 40px;

  ${MEDIA.XSMALL(`
    height: 20px;
  `)}
`;

const Name = styled.span`
  color: ${COLORS.PRIMARY};
  margin-left: 10px;
  letter-spacing: 1.3px;
  transition: font-size 0.3s ease;

  ${MEDIA.SMALL(`
    font-size: 16px;
  `)}

  ${MEDIA.XSMALL(`
    font-size: 16px;
    margin-left: 5px;
  `)}
`;

// const NavLink = styled(Link)`
//   color: ${COLORS.WHITE};
//   text-transform: uppercase;
//   margin-right: 40px;
//   transition: color 0.3s ease,
//               margin 0.3s ease,
//               font-size 0.3s ease;
//   letter-spacing: 3px;

//   &:hover {
//     color: ${props => props.color};
//   }

//   ${MEDIA.SMALL(`
//     font-size: 16px;
//     margin: 0 10px;
//   `)}

//   ${MEDIA.XSMALL(`
//     margin: 0;
//   `)}
// `;

export default () => (
  <Container>
    <Left
      to="/"
    >
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Name>Josh Farrant</Name>
    </Left>
    {
      /*
        <Right>
          {
            links.map(({ color, label, to }) => (
              <NavLink
                key={label}
                to={to}
                color={color}
                activeStyle={{
                  color,
                }}
              >
                {label}
              </NavLink>
            ))
          }
        </Right>
      */
   }
  </Container>
);
