import React from "react";
import styled from "styled-components";

interface TooltipDialogProps {
  top: number;
  left: number;
  children: React.ReactNode;
}

const TooltipWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  z-index: 1000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background: white;
  padding: 10px;
  max-width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  white-space: pre-wrap;
`;

export const TooltipDialog: React.FC<TooltipDialogProps> = ({
  top,
  left,
  children,
}) => {
  return (
    <TooltipWrapper top={top} left={left}>
      {children}
    </TooltipWrapper>
  );
};
