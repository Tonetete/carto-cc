import React from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { BaseNode } from "@atoms/BaseNode/BaseNode";
import { Input } from "@atoms/Input/Input";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const SourceNode: React.FC<NodeProps> = ({ id, data }) => {
  const { setNodes } = useReactFlow();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                url: newUrl,
              },
            }
          : node,
      ),
    );
  };

  return (
    <Wrapper>
      <BaseNode
        nodeId={id}
        handleId={`handle-id-${id}`}
        position={Position.Right}
        connectionCount={1}
        type="source"
      />
      <div>Source</div>
      <Input
        value={data.url as string}
        onChange={(value) => handleUrlChange(value)}
        placeholder="https://example.com/data.geojson"
      ></Input>
    </Wrapper>
  );
};
