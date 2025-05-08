import styled from "styled-components";

export const TopBar = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  z-index: 10;
`;
