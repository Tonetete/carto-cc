import React from "react";
import styled, { css } from "styled-components";

interface NodeSidebarProps {
  connectorPositions?: Array<"left" | "right" | "top" | "bottom">;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  children: React.ReactNode;
}

const Wrapper = styled.div`
  background-color: #ffffff;
  border: 2px solid #0f172a;
  border-radius: 12px;
  padding: 24px;
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #0f172a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  cursor: grab;
`;

const Connector = styled.div<{ position: string }>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #0f172a;
  border-radius: 50%;

  ${({ position }) =>
    position === "left" &&
    css`
      top: 50%;
      left: -6px;
      transform: translateY(-50%);
    `}

  ${({ position }) =>
    position === "right" &&
    css`
      top: 50%;
      right: -6px;
      transform: translateY(-50%);
    `}

  ${({ position }) =>
    position === "top" &&
    css`
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
    `}

  ${({ position }) =>
    position === "bottom" &&
    css`
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
    `}
`;

export const NodeSidebar: React.FC<NodeSidebarProps> = ({
  connectorPositions = [],
  onDragStart,
  draggable = false,
  children,
}) => {
  return (
    <Wrapper onDragStart={onDragStart} draggable={draggable}>
      {children}
      {connectorPositions.map((pos) => (
        <Connector key={pos} position={pos} />
      ))}
    </Wrapper>
  );
};
