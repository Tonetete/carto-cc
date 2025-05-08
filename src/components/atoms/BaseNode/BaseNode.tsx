import React from "react";
import {
  Handle,
  useNodeConnections,
  Position,
  HandleType,
} from "@xyflow/react";

interface BaseNodeProps {
  nodeId: string;
  handleId: string;
  type: HandleType;
  connectionCount: number;
  position: Position;
}

export const BaseNode = ({
  handleId,
  nodeId,
  type,
  connectionCount,
  position,
}: BaseNodeProps) => {
  const connections = useNodeConnections({
    id: nodeId,
    handleId,
    handleType: type,
  });

  return (
    <Handle
      id={handleId}
      isConnectable={connections.length < connectionCount}
      position={position}
      type={type}
    />
  );
};
