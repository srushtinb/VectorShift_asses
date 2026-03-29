import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const MathNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || "add");
  const [operandB, setOperandB] = useState(data?.operandB ?? 10);

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const handleOperandBChange = (e) => {
    const parsed = Number(e.target.value);
    setOperandB(Number.isFinite(parsed) ? parsed : 0);
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
        <span>Math</span>
      </div>

      <div>
        <label>
          Op:
          <select value={operator} onChange={handleOperatorChange}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          B:
          <input
            type="number"
            value={operandB}
            onChange={handleOperandBChange}
            style={{ width: "80px" }}
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
