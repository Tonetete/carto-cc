import styled from "styled-components";

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  width: 100%;
  box-sizing: border-box;
  height: 20px;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
