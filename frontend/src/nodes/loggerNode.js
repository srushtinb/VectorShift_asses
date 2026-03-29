import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const LoggerNode = ({ id, data }) => {
  const [level, setLevel] = useState(data?.level || "info");
  const [prefix, setPrefix] = useState(data?.prefix || "[log]");

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
  };

  return (
    <BaseNode nodeId={id}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{ top: "50%" }}
      />

      <div>
        <span>Logger</span>
      </div>

      <div>
        <label>
          Level:
          <select value={level} onChange={handleLevelChange}>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Prefix:
          <input
            type="text"
            value={prefix}
            onChange={handlePrefixChange}
            style={{ width: "140px" }}
          />
        </label>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: "50%" }}
      />
    </BaseNode>
  );
};
