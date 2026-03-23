import { describe, it, expect } from "vitest";
import { sanitizeNumericInput } from "@/utils/sanitizeNumericInput";

describe("sanitizeNumericInput", () => {
  it("returns the same value for a valid numeric string", () => {
    expect(sanitizeNumericInput("123")).toBe("123");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeNumericInput("")).toBe("");
  });

  it("strips decimal characters", () => {
    expect(sanitizeNumericInput("12.5")).toBe("125");
  });

  it("strips negative sign", () => {
    expect(sanitizeNumericInput("-42")).toBe("42");
  });

  it("strips alphabetic characters from pasted input", () => {
    expect(sanitizeNumericInput("abc123def")).toBe("123");
  });

  it("strips all non-digit characters from a mixed string", () => {
    expect(sanitizeNumericInput("1-2.3abc")).toBe("123");
  });

  it("returns empty string for a purely non-numeric input", () => {
    expect(sanitizeNumericInput("abc")).toBe("");
  });

  it("handles a single digit correctly", () => {
    expect(sanitizeNumericInput("7")).toBe("7");
  });
});
