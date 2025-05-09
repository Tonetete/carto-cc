import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EditorPage } from "./EditorPage";
import { TestProviders } from "../../../../test/utils/test-utils";
import { ReactFlowProvider } from "@xyflow/react";

describe("EditorPage Integration Test", () => {
  test("renders source, layer, and intersection nodes in sidebar", () => {
    render(
      <TestProviders>
        <ReactFlowProvider>
          <BrowserRouter>
            <EditorPage />
          </BrowserRouter>
        </ReactFlowProvider>
      </TestProviders>,
    );

    expect(screen.getByText("Source")).toBeInTheDocument();
    expect(screen.getByText("Layer")).toBeInTheDocument();
    expect(screen.getByText("Intersection")).toBeInTheDocument();
  });
});
