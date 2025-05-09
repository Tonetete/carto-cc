import styled, { css } from "styled-components";

interface ButtonProps {
  absolute?: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
}

export const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 100px;
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }

  ${({ absolute, top, right, bottom, left, zIndex }) =>
    absolute &&
    css`
      position: absolute;
      ${top && `top: ${top};`}
      ${right && `right: ${right};`}
      ${bottom && `bottom: ${bottom};`}
      ${left && `left: ${left};`}
      ${zIndex && `z-index: ${zIndex};`}
    `}
`;
