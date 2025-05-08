import React from "react";
import { Handle, NodeProps, Position, useNodeConnections } from "@xyflow/react";

export const IntersectionNode: React.FC<NodeProps> = ({ id }) => {
  const handleIdInput1 = `handle-id-input-${id}-1`;
  const handleIdInput2 = `handle-id-input-${id}-2`;
  const handleIdOut = `handle-id-out-${id}`;

  const connections1 = useNodeConnections({
    id,
    handleId: handleIdInput1,
    handleType: "target",
  });

  const connections2 = useNodeConnections({
    id,
    handleId: handleIdInput2,
    handleType: "target",
  });

  const connectionsOut = useNodeConnections({
    id,
    handleId: handleIdOut,
    handleType: "source",
  });

  return (
    <>
      <Handle
        style={{ top: "20%" }}
        type="target"
        position={Position.Left}
        id={handleIdInput1}
        isConnectable={connections1.length === 0}
      />
      <Handle
        style={{ top: "80%" }}
        type="target"
        position={Position.Left}
        id={handleIdInput2}
        isConnectable={connections2.length === 0}
      />
      <div>Intersection</div>
      <Handle
        type="source"
        position={Position.Right}
        id={handleIdOut}
        isConnectable={connectionsOut.length === 0}
      />
    </>
  );
};
