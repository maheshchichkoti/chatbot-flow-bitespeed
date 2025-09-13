import type { Node, Edge } from "reactflow";

export function validateFlow(nodes: Node[], edges: Edge[]) {
  if (!nodes || nodes.length === 0) {
    return { valid: false, reason: "Flow must contain at least one node." };
  }

  // Ensure all message nodes have text
  for (const n of nodes) {
    if (n.type === "message" && !n.data?.text?.trim()) {
      return { valid: false, reason: "Message nodes cannot be empty." };
    }
  }

  if (nodes.length > 1) {
    const targets = new Set(edges.map((e) => e.target));
    const withoutIncoming = nodes.filter((n) => !targets.has(n.id));

    if (withoutIncoming.length > 1) {
      return {
        valid: false,
        reason: "More than one node has no incoming connection.",
      };
    }
  }

  return { valid: true, reason: "Valid flow." };
}
