import React from "react";
import { useFlowStore } from "../store/useFlowStore";
import type { Node } from "reactflow";

type Props = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  leftPaneMode?: boolean;
};

export default function SettingsPanel({
  nodes,
  setNodes,
  leftPaneMode = false,
}: Props) {
  const { selectedNodeId } = useFlowStore();
  const selected = nodes.find((n) => n.id === selectedNodeId) ?? null;

  if (!selected) {
    return (
      <div className="p-4">
        <div className="text-sm font-medium text-gray-600">Settings</div>
        <div className="text-xs text-gray-500 mt-4">Select a node to edit.</div>
      </div>
    );
  }

  const updateNodeText = (id: string, text: string) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, text } } : n))
    );
  };

  return (
    <div className={leftPaneMode ? "p-3" : "p-4"}>
      <div className="text-sm font-medium text-gray-600">Message</div>

      <label className="block mt-3 text-xs text-gray-500">Text</label>
      <textarea
        className="w-full mt-2 p-2 border rounded resize-y min-h-[96px] focus:ring focus:ring-teal-200 outline-none"
        value={selected.data?.text ?? ""}
        onChange={(e) => updateNodeText(selected.id, e.target.value)}
      />

      {!leftPaneMode && (
        <div className="text-xs text-gray-400 mt-3">
          Changes are applied immediately.
        </div>
      )}
    </div>
  );
}
