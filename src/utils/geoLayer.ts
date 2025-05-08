import { GeoJsonLayer } from "@deck.gl/layers";
import { Node } from "@xyflow/react";
import { PickingInfo } from "@deck.gl/core";

const EXAMPLE_GEO_LAYER_DATASET =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json";

export const buildGeoLayer = ({
  n,
  onHover,
}: {
  n: Node;
  onHover?: (info: PickingInfo) => void;
}) =>
  new GeoJsonLayer({
    id: `${n.id}-geo-layer`,
    data: n.data.url as string,
    pickable: true,
    stroked: true,
    filled: true,
    getPointRadius: 100,
    getFillColor: (() => getRandomColor()) as any,
    getLineColor: (() => getRandomColor()) as any,
    lineWidthMinPixels: 5,
    onHover,
  });

const getRandomColor = () => {
  const lineColorMap = {
    red: [255, 0, 0, 180],
    blue: [66, 133, 244, 180],
    green: [0, 200, 0, 180],
    yellow: [255, 215, 0, 180],
    orange: [255, 165, 0, 180],
    black: [128, 128, 128, 180],
  };
  const keys = Object.keys(lineColorMap);
  const randomKey = keys[
    Math.floor(Math.random() * keys.length)
  ] as keyof typeof lineColorMap;
  return lineColorMap[randomKey];
};
