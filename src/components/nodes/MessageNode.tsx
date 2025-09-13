import React from "react";
import { Handle, Position } from "reactflow";

export default React.memo(function MessageNode({
  id,
  data,
}: {
  id: string;
  data: { text: string };
}) {
  const text = data?.text?.trim() || "Empty message";
  return (
    <div className="node-card min-w-[220px]">
      <div className="flex justify-between items-center">
        <strong className="text-sm">Send Message</strong>
      </div>
      <div className="mt-2 text-gray-700 truncate">{text}</div>

      {/* Incoming */}
      <Handle type="target" position={Position.Left} className="bg-gray-600" />

      {/* Outgoing */}
      <Handle
        type="source"
        position={Position.Right}
        id={`src-${id}`}
        className="bg-gray-600"
      />
    </div>
  );
});
