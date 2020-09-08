import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFielled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

  position: relative;
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }



  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff872c;
      border-color: #5636d3;
      span {
        transform: scale(0.6) translateY(-10px);
      }
    `}

  ${props =>
    props.isFielled &&
    css`
      color: #ff872c;
      span {
        transform: scale(0.6) translateY(-10px);
      }
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #5636D3;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Label = styled.label`
  span {
    color: #666360;
    height: 57px;
    position: absolute;
    top: 0;
    left: 50px;

    display: flex;
    align-items: center;

    transform-origin: 0% 0%;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;

    transition: 0.2s ease-in-out;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
