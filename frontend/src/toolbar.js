import { DraggableNode } from "./draggableNode";
export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "14px",
        background: "#0f172a",
        border: "1px solid #1f2937",
        borderRadius: 14,
        boxShadow: "0 12px 34px rgba(0, 0, 0, 0.35)",
        margin: "14px",
      }}
    >
      <div style={{ fontWeight: 800, color: "#e5e7eb", marginBottom: 10 }}>
        Nodes
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="logger" label="Logger" />
      </div>
    </div>
  );
};
