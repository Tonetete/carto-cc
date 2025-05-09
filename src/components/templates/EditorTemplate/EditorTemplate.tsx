import "@xyflow/react/dist/style.css";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  addEdge,
  Background,
  Connection,
  EdgeChange,
  NodeChange,
  NodeTypes,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { SourceNode } from "@organisms/SourceNode/SourceNode";
import { LayerNode } from "@organisms/LayerNode/LayerNode";
import { NodeData, TypeOfNode } from "../../../types/diagram";
import { useReactFlowStore } from "@hooks/useReactFlowStore";
import { IntersectionNode } from "@organisms/IntersectionNode/IntersectionNode";

const nodeTypes: NodeTypes = {
  source: SourceNode,
  layer: LayerNode,
  intersection: IntersectionNode,
};

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const EditorTemplate: React.FC<{}> = () => {
  const {
    nodes: nodesState,
    setNodesState,
    edges: edgesState,
    setEdgesState,
    viewport,
    setViewportState,
  } = useReactFlowStore();
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesState);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesState);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  useEffect(() => {
    setNodesState(nodes);
    setEdgesState(edges);
    setViewportState(viewport);
  }, [edges, nodes, viewport]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => onNodesChange(changes),
    [onNodesChange],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => onEdgesChange(changes),
    [onEdgesChange],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const nodeType = event.dataTransfer.getData("application/reactflow");
    if (!nodeType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const data: NodeData = { label: nodeType };
    if (nodeType === TypeOfNode.Source) data.url = "";

    setNodes((nds) => [
      ...nds,
      {
        id: crypto.randomUUID(),
        data,
        position,
        type: nodeType,
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  return (
    <Layout>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onDragOver={onDragOver}
        onDrop={onNodeDrop}
        fitView
      >
        <Background />
      </ReactFlow>
    </Layout>
  );
};
