import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onNodesDelete: (deletedNodes) => {
    const deletedNodeIds = new Set(deletedNodes.map((n) => String(n.id)));
    set({
      nodes: get().nodes.filter((n) => !deletedNodeIds.has(n.id)),
      // Ensure deleting a node removes connected edges immediately.
      edges: get().edges.filter((e) => {
        const source = e?.source != null ? String(e.source) : null;
        const target = e?.target != null ? String(e.target) : null;
        return (
          !(source && deletedNodeIds.has(source)) &&
          !(target && deletedNodeIds.has(target))
        );
      }),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onEdgesDelete: (deletedEdges) => {
    const deletedEdgeIds = new Set(deletedEdges.map((e) => e.id));
    set({
      edges: get().edges.filter((e) => !deletedEdgeIds.has(e.id)),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges,
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
}));
