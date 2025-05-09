import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactFlowProvider } from "@xyflow/react";
import { MapPage } from "./MapPage";
import * as reactFlowStore from "@hooks/useReactFlowStore";
import { TestProviders } from "../../../../test/utils/test-utils";

jest.mock("@utils/env", () => ({
  getEnv: () => ({
    GOOGLE_MAP_ID: "mock-map-id",
    GOOGLE_MAPS_API_KEY: "mock-api-key",
  }),
}));

jest.mock("@deck.gl/google-maps", () => ({
  GoogleMapsOverlay: class {
    setMap = jest.fn();
  },
}));

jest.mock("@deck.gl/layers", () => ({
  GeoJsonLayer: function MockGeoJsonLayer(props: any) {
    return props;
  },
}));

jest.mock("@vis.gl/react-google-maps", () => {
  const actual = jest.requireActual("@vis.gl/react-google-maps");
  return {
    ...actual,
    useMap: () => ({}),
  };
});

jest.spyOn(reactFlowStore, "useReactFlowStore").mockReturnValue({
  nodes: [
    {
      id: "1",
      data: { label: "source", url: "https://example.com.geojson" },
      position: { x: 0, y: 0 },
      type: "source",
    },
    {
      id: "2",
      data: { label: "layer" },
      position: { x: 0, y: 100 },
      type: "layer",
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
    },
  ],
});

describe("MapPage", () => {
  it("renders the map page with back button", () => {
    render(
      <TestProviders>
        <ReactFlowProvider>
          <BrowserRouter>
            <MapPage />
          </BrowserRouter>
        </ReactFlowProvider>
      </TestProviders>,
    );

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });
});
