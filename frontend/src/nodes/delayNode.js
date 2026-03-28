import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs ?? 250);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  const handleDelayMsChange = (e) => {
    const parsed = Number(e.target.value);
    setDelayMs(Number.isFinite(parsed) ? parsed : 0);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <BaseNode nodeId={id}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{ top: '50%' }}
      />

      <div>
        <span>Delay</span>
      </div>

      <div>
        <label>
          Delay:
          <input
            type="number"
            value={delayMs}
            onChange={handleDelayMsChange}
            style={{ width: '80px' }}
          />
        </label>
      </div>

      <div>
        <label>
          Unit:
          <select value={unit} onChange={handleUnitChange}>
            <option value="ms">ms</option>
            <option value="s">s</option>
          </select>
        </label>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />
    </BaseNode>
  );
};

