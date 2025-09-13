export default function NodesPanel() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-2 border-r w-40">
      <div
        className="border p-2 cursor-pointer"
        onDragStart={(e) => onDragStart(e, "message")}
        draggable
      >
        Message
      </div>
    </aside>
  );
}
