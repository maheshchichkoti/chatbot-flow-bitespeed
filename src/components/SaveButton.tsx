import { useState } from "react";
import { validateFlow } from "../utils/validation";
import TopBanner from "./TopBanner";
import type { Node, Edge } from "reactflow";

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export default function SaveButton({ nodes, edges }: Props) {
  const [banner, setBanner] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const onSave = () => {
    const { valid, reason } = validateFlow(nodes, edges);

    if (!valid) {
      setBanner({ message: reason || "Cannot save flow.", type: "error" });
      return;
    }

    console.log("✅ Flow Saved:", { nodes, edges });
    localStorage.setItem("flow", JSON.stringify({ nodes, edges }));
    setBanner({ message: "Flow saved successfully.", type: "success" });
  };

  return (
    <>
      <TopBanner
        message={banner?.message ?? null}
        type={banner?.type ?? "error"}
      />
      <button
        onClick={onSave}
        className="px-4 py-2 bg-teal-600 text-white rounded shadow hover:bg-teal-700 transition"
      >
        Save Changes
      </button>
    </>
  );
}
