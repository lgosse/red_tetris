import React from 'react';

import styled from 'styled-components';
import global from '../../styles/global';

export const Spacer = styled.div`
  flex: 1;
`;

export const Button = styled.button`
  padding: 15px 25px;
  font-family: ${global.font.family.game};
  transition: all 0.5s;
  border: none;
  background-color: unset;
  outline: none;
  cursor: pointer;

  ${props =>
    props.disabled &&
    `
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    `};
  ${props => props.width !== undefined && `width: ${props.width}`};
  ${props => props.margin !== undefined && `margin: ${props.margin}`};
  ${props => props.marginTop !== undefined && `margin-top: ${props.marginTop}`};
  ${props =>
    props.marginBottom !== undefined && `margin-bottom: ${props.marginBottom}`};
  ${props =>
    props.marginLeft !== undefined && `margin-left: ${props.marginLeft}`};
  ${props =>
    props.marginRight !== undefined && `margin-right: ${props.marginRight}`};
  ${props =>
    props.primary
      ? `
          background-color: ${global.color.primary};
          border: 1px solid ${global.color.accent};
          color: ${global.color.accent};

          &:hover {
            background-color: ${global.color.accent};
            color: ${global.color.primary};
          }
        `
      : `
          background-color: ${global.color.accent};
          color: ${global.color.primary};

          &:hover {
            background-color: ${global.color.accent};
            color: ${global.color.accent};
          }
    `};
`;

export const FlexContainer = styled.div`
  display: flex;
  ${props => props.direction && `flex-direction: ${props.direction}`};
  ${props => props.height && `height: ${props.height}`};
  ${props => props.flex && `flex: 1`};
  ${props => props.padding && `padding: ${props.padding}`};
  ${props => props.paddingRight && `padding-right: ${props.paddingRight}`};
  ${props => props.paddingLeft && `padding-left: ${props.paddingLeft}`};
  ${props => props.paddingTop && `padding-top: ${props.paddingTop}`};
  ${props => props.paddingBottom && `padding-bottom: ${props.paddingBottom}`};
  ${props => props.padding && `padding: ${props.padding}`};
`;

export const FlexSpacer = styled.div`
  flex: 1;
`;

export const FullSizeContainer = styled.div`
  width: 100%;
  ${props => props.height && `height: ${props.height}`};
  ${props => props.padding && `padding: ${props.padding}`};
  ${props => props.flexContainer && `display: flex`};
  ${props => props.flex && `flex: 1`};
`;

const Hexagone = styled.span`
  display: block;
  position: relative;
  width: 20px;
  height: 11.54700538px;
  background-color: ${props => (props.primary ? `#bb3c2f` : `#dcddd8`)};

  margin: 6.66666667px 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }

  &:before {
    bottom: 100%;
    border-bottom: 6.66666667px solid
      ${props => (props.primary ? `#bb3c2f` : `#dcddd8`)};
  }

  &:after {
    top: 100%;
    width: 0;
    border-top: 6.66666667px solid
      ${props => (props.primary ? `#bb3c2f` : `#dcddd8`)};
  }
`;

const HexaContainer = styled.div`
  height: 6px;
`;

export const Paragraph = styled.div`
  ${props => {
    if (props.width && props.center) {
      return `margin: auto; width: ${props.width}; text-align: center`;
    } else if (props.width && !props.center) {
      return `width: ${props.width}`;
    } else if (!props.width && props.center) {
      return `text-align: center`;
    }
  }};
  ${props => props.color && `color: ${global.color[props.color]}`};
  ${props => props.bold && `font-weight: 700`};
  font-size: ${props => (props.size ? props.size : `14px`)};
  ${props => props.padding && `padding: ${props.padding}`};
  ${props => props.gameFont && `font-family: ${global.font.family.game}`};
  ${props => props.flex && `display: flex`};
`;

export const RedContainer = FullSizeContainer.extend`
  background-color: ${global.color.primary};
  background-image: ${global.assets.backgroundRed};
`;

export const LightContainer = FullSizeContainer.extend`
  background-image: ${global.assets.backgroundLight};
  background-color: ${global.color.accent};
`;

export const GameFont = styled.span`
  font-family: ${global.font.family.game};
`;

export const Input = styled.input`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 234px;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  margin-bottom: 10px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
  color: ${global.color.accent};

  &::placeholder {
    color: ${global.color.accent};
  }
`;

export const HexaSeparator = props => (
  <HexaContainer>
    <Hexagone primary={props.primary} />
  </HexaContainer>
);

const FaIcon = props => <i className={`fa fa-${props.className}`} />;

export const Icon = styled(FaIcon)`
  ${props => props.width && `width: ${props.width};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${props => props.marginRight && `margin-right: ${props.marginRight};`}
  ${props => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
  ${props => props.primary && `color: ${global.color.primary};`};
  ${props => props.accent && `color: ${global.color.accent};`};
  ${props => props.size && `font-size: ${props.size};`};
  ${props => props.clickable && `cursor: pointer;`};
`;

export const ModalBackground = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const ModalContainer = styled.div`
  max-width: ${props => (props.width ? props.width : '500px')};
  border-radius: ${global.border.radius};
  overflow: hidden;
  box-shadow: ${global.shadow.light};
  flex: 1;
`;

export const Modal = ({ children }) => (
  <ModalBackground>
    <ModalContainer>{children}</ModalContainer>
  </ModalBackground>
);

export const ModalHeader = RedContainer.extend`
  width: 100%;
  padding: ${global.padding.md};
  font-size: ${global.font.size.title};
  font-family: ${global.font.family.game};
  text-shadow: ${global.font.shadow.heavy};
  color: ${global.color.accent};
`;

export const ModalBody = LightContainer.extend`
  width: 100%;
  padding: ${global.padding.md};
`;

export const ModalFooter = RedContainer.extend`
  width: 100%;
  color: ${global.color.accent};
  padding: ${global.padding.md};
`;

export const Text = styled.div`
  font-family: ${props =>
    props.gameFont ? global.font.family.game : global.font.family.primary};
  font-size: ${props => props.size || global.font.size.subtitle};
  color: ${props =>
    props.primary ? global.color.primary : global.color.accent};
  ${props => props.padding && `padding: ${props.padding};`};
`;
