import { describe, it, expect } from "vitest";
import { validateFlow } from "./validation";
import type { Edge } from "reactflow";

const makeNode = (id: string, text = "Hello") => ({
  id,
  type: "message",
  position: { x: 0, y: 0 },
  data: { text },
});

describe("validateFlow (spec version)", () => {
  it("fails if no nodes", () => {
    const res = validateFlow([], []);
    expect(res.valid).toBe(false);
  });

  it("passes with one node and no edges", () => {
    const nodes = [makeNode("1")];
    const res = validateFlow(nodes, []);
    expect(res.valid).toBe(true);
  });

  it("fails if multiple nodes have no incoming edges", () => {
    const nodes = [makeNode("1"), makeNode("2")];
    const edges: Edge[] = [];
    const res = validateFlow(nodes, edges);
    expect(res.valid).toBe(false);
  });

  it("passes if only one node has no incoming edge", () => {
    const nodes = [makeNode("1"), makeNode("2")];
    const edges: Edge[] = [{ id: "e1", source: "1", target: "2" }];
    const res = validateFlow(nodes, edges);
    expect(res.valid).toBe(true);
  });
});
