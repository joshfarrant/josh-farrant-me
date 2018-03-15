import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { COLORS, FONT_WEIGHT, MEDIA } from '../../utils/styles';

const copiedAnim = keyframes`
  0% {
    top: 5%;
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  100% {
    top: -50%;
    opacity: 0;
  }
`;

const StyledList = styled.ul`
  width: 100%;
  min-height: 60px;
  background-color: ${COLORS.DARKEST_GREY};
  margin: 0;
  padding: 10px 20px;
  box-sizing: border-box;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const StyledListItem = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: line-height 0.3s ease;
  line-height: 60px;
  position: relative;

  ${MEDIA.SMALL(`
    font-size: 14px;
    line-height: 40px;
  `)}
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: ${COLORS.WHITE};
  font-weight: ${FONT_WEIGHT.REGULAR};
  letter-spacing: 1.1px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.color};
  }

  ${MEDIA.SMALL(`
    font-size: 14px;
  `)}
`;

const Copyable = styled(CopyToClipboard)`
  color: ${COLORS.WHITE};
  font-weight: ${FONT_WEIGHT.REGULAR};
  letter-spacing: 1.1px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.color};
  }

  ${MEDIA.SMALL(`
    font-size: 14px;
  `)}
`;

const CopyableCopied = styled(Copyable)`
  &:before {
    content: 'Copied!';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    animation: ${copiedAnim} 1.5s cubic-bezier(0, 0.4, 0.3, 1);
  }
  :global
`;

const SeparatorWrapper = styled.li`
  margin: 0 10px;
  color: ${props => props.color};
  font-size: 42px;
  font-weight: ${FONT_WEIGHT.LIGHT};
  user-select: none;
  line-height: 60px;
  transition: line-height 0.3s ease;

  ${MEDIA.SMALL(`
    font-size: 22px;
    line-height: 40px;
  `)}
`;

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.itemCopied = this.itemCopied.bind(this);

    let state = {};

    this.links.forEach((link, i) => {
      if (!link.href) {
        state = {
          ...state,
          [`copied${i}`]: false,
        };
      }
    });

    this.state = {
      ...state,
    };
  }

  links = [
    {
      label: '0330 120 0030',
      color: COLORS.PINK,
    }, {
      label: 'josh@farrant.me',
      color: COLORS.YELLOW,
    }, {
      label: 'Twitter',
      href: 'https://twitter.com/farpixel',
      color: COLORS.BLUE,
    }, {
      label: 'GitHub',
      href: 'https://github.com/joshfarrant/',
      color: COLORS.GREEN,
    }, {
      label: 'Blog',
      href: 'http://💻☕️.ws',
      color: COLORS.RED,
    },
  ];

  itemCopied = (idx) => {
    const stateName = `copied${idx}`;

    this.setState({
      [stateName]: true,
    });

    setTimeout(() => {
      this.setState({
        [stateName]: false,
      });
    }, 1500);
  }

  buildListItems = links => (
    links
      .map(({ color, label, href }, idx) => {
        let interiorEl = (
          <StyledAnchor
            href={href}
            target="_blank"
            rel="noopener"
            color={color}
          >
            <span>{label}</span>
          </StyledAnchor>
        );

        if (!href) {
          const copied = this.state[`copied${idx}`];
          const CopyComponent = copied ? CopyableCopied : Copyable;
          interiorEl = (
            <CopyComponent
              key={`copy-${label}`}
              color={color}
              text={label}
              onCopy={() => this.itemCopied(idx)}
            >
              <span>{label}</span>
            </CopyComponent>
          );
        }

        return (
          <StyledListItem
            key={label}
          >
            {interiorEl}
          </StyledListItem>
        );
      })
      .reduce((a, c, i) => [
        a,
        <SeparatorWrapper
          key={`${links[i].label}-/`}
          color={[
            COLORS.YELLOW,
            COLORS.BLUE,
            COLORS.GREEN,
            COLORS.RED,
          ][i - 1]}
        >
          /
        </SeparatorWrapper>,
        c,
      ])
  )

  render() {
    const listItems = this.buildListItems(this.links);
    return (
      <StyledList>
        {listItems}
      </StyledList>
    );
  }
}
