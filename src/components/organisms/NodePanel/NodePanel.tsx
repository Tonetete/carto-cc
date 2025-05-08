import React from "react";
import styled from "styled-components";
import { NodeSidebar } from "@atoms/NodeSidebar/NodeSidebar";
import { TypeOfNode } from "../../../types/diagram";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  height: 100%;
  min-width: 200px;
  max-width: 300px;
`;

export const NodePanel: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: TypeOfNode,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <Wrapper>
        <NodeSidebar
          connectorPositions={["right"]}
          onDragStart={(event) => onDragStart(event, TypeOfNode.Source)}
          draggable
        >
          Source
        </NodeSidebar>
        <NodeSidebar
          connectorPositions={["left"]}
          onDragStart={(event) => onDragStart(event, TypeOfNode.Layer)}
          draggable
        >
          Layer
        </NodeSidebar>
        <NodeSidebar
          connectorPositions={["left", "bottom", "right"]}
          onDragStart={(event) => onDragStart(event, TypeOfNode.Intersection)}
          draggable
        >
          Intersection
        </NodeSidebar>
      </Wrapper>
    </aside>
  );
};

export default NodePanel;
