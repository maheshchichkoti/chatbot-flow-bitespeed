import React from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type ReactFlowInstance,
  type Node,
  type Edge,
  type Connection,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "../store/useFlowStore";
import MessageNode from "./nodes/MessageNode";
import { nanoid } from "nanoid";

const nodeTypes = { message: MessageNode };

type Props = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

export default function FlowBuilder({
  nodes,
  setNodes,
  edges,
  setEdges,
}: Props) {
  const { setSelectedNodeId } = useFlowStore();
  const [rfInstance, setRfInstance] = React.useState<ReactFlowInstance | null>(
    null
  );

  const onConnect = React.useCallback(
    (params: Connection) => {
      const alreadyHasEdge = edges.some(
        (e) =>
          e.source === params.source && e.sourceHandle === params.sourceHandle
      );
      if (!alreadyHasEdge) {
        setEdges((eds) => addEdge({ ...params, animated: true }, eds));
      }
    },
    [edges, setEdges]
  );

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !rfInstance) return;

      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: nanoid(),
        type,
        position,
        data: { text: "" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance, setNodes]
  );

  const onDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => applyEdgeChanges(changes, eds))
        }
        onConnect={onConnect}
        onInit={setRfInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
