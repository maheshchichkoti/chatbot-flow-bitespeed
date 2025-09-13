import { useState } from "react";
import type { Node, Edge } from "reactflow";

import FlowBuilder from "./components/FlowBuilder";
import NodesPanel from "./components/NodesPanel";
import SaveButton from "./components/SaveButton";
import SettingsPanel from "./components/SettingsPanel";
import { useFlowStore } from "./store/useFlowStore";

import "./App.css";

function App() {
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  return (
    <div className="h-screen flex">
      {/* Left sidebar */}
      <div className="w-64 border-r bg-white">
        {selectedNodeId ? (
          <SettingsPanel leftPaneMode nodes={nodes} setNodes={setNodes} />
        ) : (
          <NodesPanel />
        )}
      </div>

      {/* Main canvas */}
      <div className="flex-1 relative">
        <FlowBuilder
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
        <div className="absolute top-4 right-6 z-40">
          <SaveButton nodes={nodes} edges={edges} />
        </div>
      </div>

      {/* Right sidebar placeholder */}
      <div className="w-80 border-l bg-white hidden lg:block"></div>
    </div>
  );
}

export default App;
