import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

export const BaseNode = ({ children, style = {}, nodeId }) => {
  const onNodesDelete = useStore((state) => state.onNodesDelete, shallow);

  const handleDeleteMouseDown = useCallback((e) => {
    // Prevent breaking selection/drag behavior when clicking the delete control.
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!nodeId) return;
      onNodesDelete([{ id: nodeId }]);
    },
    [nodeId, onNodesDelete],
  );

  return (
    <div
      style={{
        width: 200,
        minHeight: 80,
        borderRadius: 12,
        border: '1px solid #334155',
        background: '#0f172a',
        color: '#e5e7eb',
        boxShadow: '0 10px 24px rgba(0, 0, 0, 0.35)',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        boxSizing: 'border-box',
        position: 'relative',
        ...style,
      }}
    >
      {nodeId ? (
        <button
          type="button"
          className="node-delete-btn"
          aria-label="Delete node"
          onMouseDown={handleDeleteMouseDown}
          onClick={handleDelete}
        >
          X
        </button>
      ) : null}
      {children}
    </div>
  );
};

