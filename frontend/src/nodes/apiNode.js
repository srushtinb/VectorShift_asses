import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const ApiNode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(
    data?.endpoint || "https://api.example.com/v1/resource",
  );
  const [method, setMethod] = useState(data?.method || "GET");

  const handleEndpointChange = (e) => {
    setEndpoint(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  return (
    <BaseNode nodeId={id}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-request`}
        style={{ top: "50%" }}
      />

      <div>
        <span>API</span>
      </div>

      <div>
        <label>
          Method:
          <select value={method} onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Endpoint:
          <input
            type="text"
            value={endpoint}
            onChange={handleEndpointChange}
            style={{ width: "160px" }}
          />
        </label>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{ top: "50%" }}
      />
    </BaseNode>
  );
};
