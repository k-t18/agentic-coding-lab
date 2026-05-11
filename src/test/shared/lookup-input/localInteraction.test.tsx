import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LookupInputField } from "@/components/shared/form-fields/LookupInputField/LookupInputField";
import { apiClient } from "@/lib/api-client";
import { defaultProps } from "./lookupInputField.helpers";

vi.mock("@/lib/api-client", () => ({
  apiClient: { get: vi.fn() },
}));

describe("LookupInputField — Phase 3: Local Interaction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("strips decimal characters from ID field input", async () => {
    render(<LookupInputField {...defaultProps} />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    fireEvent.change(idInput, { target: { value: "12.5" } });

    expect(idInput).toHaveValue("125");
  });

  it("strips negative sign from ID field input", async () => {
    render(<LookupInputField {...defaultProps} />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    fireEvent.change(idInput, { target: { value: "-42" } });

    expect(idInput).toHaveValue("42");
  });

  it("strips alphabetic characters from ID field input", async () => {
    render(<LookupInputField {...defaultProps} />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    fireEvent.change(idInput, { target: { value: "abc123" } });

    expect(idInput).toHaveValue("123");
  });

  it('blocks "e" key to prevent scientific notation in ID field', async () => {
    render(<LookupInputField {...defaultProps} />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    const event = fireEvent.keyDown(idInput, { key: "e", code: "KeyE" });

    expect(event).toBe(false); // preventDefault was called
  });

  it("blocks decimal point key in ID field", async () => {
    render(<LookupInputField {...defaultProps} />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    const event = fireEvent.keyDown(idInput, { key: ".", code: "Period" });

    expect(event).toBe(false);
  });

  it("blocks minus key in ID field", async () => {
    render(<LookupInputField {...defaultProps} />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    const event = fireEvent.keyDown(idInput, { key: "-", code: "Minus" });

    expect(event).toBe(false);
  });

  it("sanitizes pasted non-numeric content in the ID field", async () => {
    const user = userEvent.setup();
    render(<LookupInputField {...defaultProps} />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    await user.click(idInput);
    await user.clear(idInput);
    await user.paste("abc123def");

    expect(idInput).toHaveValue("123");
  });

  it("clearing the ID field clears the description field", async () => {
    const user = userEvent.setup();
    render(<LookupInputField {...defaultProps} mode="manual-entry" />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });
    const descInput = screen.getByRole("textbox", {
      name: /account description/i,
    });

    await user.type(descInput, "Some description");
    expect(descInput).toHaveValue("Some description");

    fireEvent.change(idInput, { target: { value: "" } });

    expect(descInput).toHaveValue("");
  });

  it("manual-entry mode never calls the lookup API on ID input", async () => {
    render(<LookupInputField {...defaultProps} mode="manual-entry" />);
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    fireEvent.change(idInput, { target: { value: "42" } });

    expect(apiClient.get).not.toHaveBeenCalled();
  });
});
