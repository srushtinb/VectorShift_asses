// textNode.js

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./baseNode";

const VARIABLE_RE = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  VARIABLE_RE.lastIndex = 0;
  while ((match = VARIABLE_RE.exec(text)) !== null) {
    const variable = match[1];
    if (!seen.has(variable)) {
      seen.add(variable);
      vars.push(variable);
    }
  }
  return vars;
};

const sanitizeVariable = (variable) => variable.replace(/[^a-zA-Z0-9_]/g, "_");

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [nodeHeight, setNodeHeight] = useState(80);
  const textareaRef = useRef(null);

  const variables = useMemo(() => extractVariables(currText), [currText]);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const nextHeight = Math.min(220, Math.max(80, el.scrollHeight + 58));
    setNodeHeight(nextHeight);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode nodeId={id} style={{ height: nodeHeight }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              width: "100%",
              resize: "none",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      {variables.map((variable, idx) => {
        const topPct = ((idx + 1) / (variables.length + 1)) * 100;
        const safeVar = sanitizeVariable(variable);
        return (
          <Handle
            key={variable}
            type="target"
            position={Position.Left}
            id={`${id}-${safeVar}`}
            style={{ top: `${topPct}%` }}
          />
        );
      })}

      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </BaseNode>
  );
};
