import React from "react";
import { NodeProps, Position } from "@xyflow/react";
import { BaseNode } from "@atoms/BaseNode/BaseNode";

export const LayerNode: React.FC<NodeProps> = ({ id }) => {
  return (
    <div>
      <BaseNode
        nodeId={id}
        handleId={`handle-id-${id}`}
        position={Position.Left}
        connectionCount={1}
        type="target"
      />
      <div>Layer</div>
    </div>
  );
};
