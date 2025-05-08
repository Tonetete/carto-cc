import React from "react";
import styled from "styled-components";
import { EditorTemplate } from "@templates/EditorTemplate/EditorTemplate";
import { Header } from "@molecules/Header/Header";
import { NodePanel } from "@organisms/NodePanel/NodePanel";
import { useNavigate } from "react-router-dom";
import { Button } from "@atoms/Button/Button.js";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  "flow-colum": "row";
`;

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToMap = () => {
    navigate("/map");
  };

  return (
    <>
      <Header>
        <Button
          absolute
          top="10px"
          right="75px"
          zIndex={1000}
          onClick={handleGoToMap}
        >
          🗺️ Map
        </Button>
      </Header>
      <Wrapper>
        <NodePanel />
        <EditorTemplate />
      </Wrapper>
    </>
  );
};
