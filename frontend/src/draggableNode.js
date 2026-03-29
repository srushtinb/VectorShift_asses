export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "92px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        borderRadius: "12px",
        backgroundColor: "#111827",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
        border: "1px solid #334155",
      }}
      draggable
    >
      <span style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
};
