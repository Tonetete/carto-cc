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

const Connector = styled.div<{
  side: "left" | "right" | "top" | "bottom";
  offset: number;
}>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #0f172a;
  border-radius: 50%;

  ${({ side, offset }) =>
    side === "left" &&
    css`
      left: -6px;
      top: ${offset}%;
      transform: translateY(-50%);
    `}

  ${({ side, offset }) =>
    side === "right" &&
    css`
      right: -6px;
      top: ${offset}%;
      transform: translateY(-50%);
    `}

  ${({ side, offset }) =>
    side === "top" &&
    css`
      top: -6px;
      left: ${offset}%;
      transform: translateX(-50%);
    `}

  ${({ side, offset }) =>
    side === "bottom" &&
    css`
      bottom: -6px;
      left: ${offset}%;
      transform: translateX(-50%);
    `}
`;

export const NodeSidebar: React.FC<NodeSidebarProps> = ({
  connectorPositions = [],
  onDragStart,
  draggable = false,
  children,
}: NodeSidebarProps) => {
  const sideCount: Record<string, number> = {};
  const connectorsWithOffset = connectorPositions.map((side) => {
    const count = sideCount[side] || 0;
    sideCount[side] = count + 1;
    return { side, index: count };
  });

  return (
    <Wrapper onDragStart={onDragStart} draggable={draggable}>
      {children}
      {connectorsWithOffset.map(({ side, index }) => {
        const total = sideCount[side];
        const offset = ((index + 1) / (total + 1)) * 100;
        return (
          <Connector key={`${side}-${index}`} side={side} offset={offset} />
        );
      })}
    </Wrapper>
  );
};
