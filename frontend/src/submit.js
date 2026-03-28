import { useCallback, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";

const API_URL = "http://localhost:8000/pipelines/parse";

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal, isModalOpen]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(JSON.stringify(data));
      }

      setModalData({
        num_nodes: data.num_nodes,
        num_edges: data.num_edges,
        is_dag: data.is_dag,
        nodes,
        edges,
      });
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setModalData({
        error: err instanceof Error ? err.message : String(err),
        nodes,
        edges,
      });
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [nodes, edges]);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "14px",
          marginBottom: "14px",
        }}
      >
        <button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "min(980px, 100%)",
              maxHeight: "85vh",
              overflow: "auto",
              background: "#0b1220",
              border: "1px solid #1f2937",
              borderRadius: 14,
              boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <div
                  style={{ fontWeight: 900, fontSize: 16, color: "#e5e7eb" }}
                >
                  Pipeline Result
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
                  Backend analysis (node/edge counts + DAG check)
                </div>
              </div>

              <button onClick={closeModal} type="button">
                Close
              </button>
            </div>

            {modalData?.error ? (
              <div
                style={{
                  marginBottom: 14,
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  background: "rgba(239, 68, 68, 0.08)",
                  color: "#fecaca",
                  fontSize: 13,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {modalData.error}
              </div>
            ) : null}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid #334155",
                  background: "#0f172a",
                  color: "#e5e7eb",
                  fontSize: 13,
                }}
              >
                Nodes: {modalData?.num_nodes ?? nodes.length}
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid #334155",
                  background: "#0f172a",
                  color: "#e5e7eb",
                  fontSize: 13,
                }}
              >
                Edges: {modalData?.num_edges ?? edges.length}
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid #334155",
                  background: "#0f172a",
                  color: "#e5e7eb",
                  fontSize: 13,
                }}
              >
                Is DAG:{" "}
                {typeof modalData?.is_dag === "boolean"
                  ? String(modalData.is_dag)
                  : "N/A"}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    color: "#e5e7eb",
                    fontSize: 13,
                    marginBottom: 8,
                  }}
                >
                  Nodes
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "#e5e7eb",
                    fontSize: 12,
                    lineHeight: 1.45,
                    maxHeight: 260,
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {JSON.stringify(modalData?.nodes ?? nodes, null, 2)}
                </pre>
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 800,
                    color: "#e5e7eb",
                    fontSize: 13,
                    marginBottom: 8,
                  }}
                >
                  Edges
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "#e5e7eb",
                    fontSize: 12,
                    lineHeight: 1.45,
                    maxHeight: 260,
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {JSON.stringify(modalData?.edges ?? edges, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
