import styled from "styled-components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { Edge, Node } from "@xyflow/react";
import { PickingInfo } from "@deck.gl/core";
import { Button } from "@atoms/Button/Button";
import { TooltipDialog } from "@atoms/TooltipDialog/TooltipDialog";
import { Header } from "@molecules/Header/Header.js";
import { useReactFlowStore } from "@hooks/useReactFlowStore";
import { buildGeoLayer } from "@utils/geoLayer";
import { TypeOfNode } from "@types/diagram";

interface DeckGLOverlayProps {
  nodes: Node[];
  edges: Edge[];
  handleHover: (info: PickingInfo) => void;
}

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };
const DEFAULT_ZOOM = 10;

const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const DeckGLOverlay: React.FC<DeckGLOverlayProps> = ({
  nodes,
  edges,
  handleHover,
}) => {
  const map = useMap();
  const overlayRef = useRef<GoogleMapsOverlay | null>(null);

  useEffect(() => {
    if (!map || !nodes?.length || !edges?.length) return;

    const isSourceOrIntersection = (n: Node) =>
      n.data.label === TypeOfNode.Source ||
      n.data.label === TypeOfNode.Intersection;

    const sourceNodes = nodes.filter(isSourceOrIntersection);

    const layerNodes = nodes
      .filter((n) => n.data.label === TypeOfNode.Layer)
      .sort((a, b) => a.position.y - b.position.y);

    const geoLayers: GeoJsonLayer[] = [];

    for (const layerNode of layerNodes) {
      const edgeToLayer = edges.find((e) => e.target === layerNode.id);
      if (!edgeToLayer) continue;

      const upstreamNode = sourceNodes.find((s) => s.id === edgeToLayer.source);
      if (!upstreamNode) continue;

      let connectedSources: Node[] = [];

      if (upstreamNode.type === TypeOfNode.Intersection) {
        const connectedEdges = edges.filter(
          (e) => e.target === upstreamNode.id,
        );
        const connectedIds = new Set(connectedEdges.map((e) => e.source));

        connectedSources = sourceNodes.filter(
          (s) => connectedIds.has(s.id) && !!s.data.url,
        );
      } else if (upstreamNode.data.url) {
        connectedSources = [upstreamNode];
      }

      connectedSources.forEach((sourceNode) => {
        geoLayers.push(buildGeoLayer({ n: sourceNode, onHover: handleHover }));
      });
    }

    const overlay = new GoogleMapsOverlay({ layers: geoLayers });
    overlay.setMap(map);
    overlayRef.current = overlay;

    return () => overlay.setMap(null);
  }, [map, nodes, edges, handleHover]);

  return null;
};

export const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const { nodes, edges } = useReactFlowStore();
  const [hoverInfo, setHoverInfo] = useState<PickingInfo | null>(null);

  const handleHover = useCallback((info: PickingInfo) => {
    if (info.object) {
      setHoverInfo(info);
    } else {
      setHoverInfo(null);
    }
  }, []);

  return (
    <>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <MapContainer>
          <Header>
            <Button
              absolute
              top="10px"
              right="75px"
              zIndex={1000}
              onClick={() => navigate("/editor")}
            >
              🔙 Back
            </Button>
          </Header>
          <Map
            mapId={GOOGLE_MAP_ID}
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            style={{ width: "100%", height: "100%" }}
          >
            <DeckGLOverlay
              nodes={nodes}
              edges={edges}
              handleHover={handleHover}
            />
          </Map>
        </MapContainer>
      </APIProvider>
      {hoverInfo?.object && (
        <TooltipDialog top={hoverInfo.y} left={hoverInfo.x}>
          <pre>{JSON.stringify(hoverInfo.object.properties, null, 2)}</pre>
        </TooltipDialog>
      )}
    </>
  );
};
