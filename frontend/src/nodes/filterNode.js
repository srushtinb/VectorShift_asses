import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const FilterNode = ({ id, data }) => {
  const [keyword, setKeyword] = useState(data?.keyword || "foo");
  const [mode, setMode] = useState(data?.mode || "contains");

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
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
        <span>Filter</span>
      </div>

      <div>
        <label>
          Keyword:
          <input
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            style={{ width: "150px" }}
          />
        </label>
      </div>

      <div>
        <label>
          Mode:
          <select value={mode} onChange={handleModeChange}>
            <option value="contains">Contains</option>
            <option value="startsWith">Starts with</option>
            <option value="endsWith">Ends with</option>
          </select>
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
