import React from "react";
import { ReactFlowProvider } from "@xyflow/react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { EditorPage } from "@pages/EditorPage/EditorPage";
import { MapPage } from "@pages/MapPage/MapPage";
import { ContainerState } from "@molecules/ContainerState/ContainerState";

const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <ContainerState>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/editor" replace />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </Router>
      </ContainerState>
    </ReactFlowProvider>
  );
};

export default App;
