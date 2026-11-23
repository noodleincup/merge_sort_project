import { describe, it, expect } from "vitest";
import { merge } from "../src/merge";

type Case = {
  name: string;
  c1: number[]; // ascending
  c2: number[]; // descending
  c3: number[]; // ascending
  expected: number[];
};

const cases: Case[] = [
  {
    name: "basic interleaving",
    c1: [1, 4, 7],
    c2: [9, 6, 3],
    c3: [2, 5, 8],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  { name: "all empty", c1: [], c2: [], c3: [], expected: [] },
  { name: "only c1 has data", c1: [1, 2, 3], c2: [], c3: [], expected: [1, 2, 3] },
  { name: "only c2 has data (descending input)", c1: [], c2: [3, 2, 1], c3: [], expected: [1, 2, 3] },
  { name: "only c3 has data", c1: [], c2: [], c3: [4, 5, 6], expected: [4, 5, 6] },
  { name: "one empty array", c1: [1, 5], c2: [], c3: [2, 3], expected: [1, 2, 3, 5] },
  {
    name: "duplicates across arrays",
    c1: [1, 2, 2],
    c2: [2, 2, 1],
    c3: [2, 3],
    expected: [1, 1, 2, 2, 2, 2, 2, 3],
  },
  { name: "all identical values", c1: [5, 5], c2: [5, 5], c3: [5], expected: [5, 5, 5, 5, 5] },
  {
    name: "negative numbers and zero",
    c1: [-10, -3, 0],
    c2: [5, -1, -7],
    c3: [-5, 2],
    expected: [-10, -7, -5, -3, -1, 0, 2, 5],
  },
  {
    name: "no overlap: c1 < c3 < c2 ranges",
    c1: [1, 2, 3],
    c2: [30, 20, 10],
    c3: [4, 5, 6],
    expected: [1, 2, 3, 4, 5, 6, 10, 20, 30],
  },
  { name: "single elements", c1: [2], c2: [3], c3: [1], expected: [1, 2, 3] },
  {
    name: "very different lengths",
    c1: [1],
    c2: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
    c3: [5, 15],
    expected: [1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
];

describe("merge (data-driven)", () => {
  it.each(cases)("$name", ({ c1, c2, c3, expected }) => {
    expect(merge(c1, c2, c3)).toEqual(expected);
  });

  it.each(cases)("does not mutate inputs: $name", ({ c1, c2, c3 }) => {
    const [a, b, c] = [[...c1], [...c2], [...c3]];
    merge(c1, c2, c3);
    expect(c1).toEqual(a);
    expect(c2).toEqual(b);
    expect(c3).toEqual(c);
  });

  it("returns a new array, not one of the inputs", () => {
    const c1 = [1, 2];
    const result = merge(c1, [], []);
    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(c1);
  });
});
