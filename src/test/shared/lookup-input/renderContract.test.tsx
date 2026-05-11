import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LookupInputField } from "@/components/shared/form-fields/LookupInputField/LookupInputField";
import { defaultProps } from "./lookupInputField.helpers";

describe("LookupInputField — Phase 2: Render Contract", () => {
  it("renders the ID input field", () => {
    render(<LookupInputField {...defaultProps} />);
    expect(
      screen.getByRole("textbox", { name: /account id/i })
    ).toBeInTheDocument();
  });

  it("renders the description input field", () => {
    render(<LookupInputField {...defaultProps} />);
    expect(
      screen.getByRole("textbox", { name: /account description/i })
    ).toBeInTheDocument();
  });

  it("renders the component label", () => {
    render(<LookupInputField {...defaultProps} label="Supplier" />);
    expect(screen.getByText("Supplier")).toBeInTheDocument();
  });

  it("description input is enabled when descriptionEnabled is true", () => {
    render(<LookupInputField {...defaultProps} descriptionEnabled />);
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).not.toBeDisabled();
  });

  it("description input is disabled when descriptionEnabled is false", () => {
    render(<LookupInputField {...defaultProps} descriptionEnabled={false} />);
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeDisabled();
  });

  it("description input is disabled by default in lookup mode", () => {
    render(<LookupInputField {...defaultProps} mode="lookup" />);
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeDisabled();
  });

  it("description input is enabled by default in manual-entry mode", () => {
    render(<LookupInputField {...defaultProps} mode="manual-entry" />);
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).not.toBeDisabled();
  });

  it("ID input is associated with the label via aria-label", () => {
    render(<LookupInputField {...defaultProps} label="Warehouse" />);
    expect(
      screen.getByRole("textbox", { name: /warehouse id/i })
    ).toBeInTheDocument();
  });

  it("renders ID input with default value of 0", () => {
    render(<LookupInputField {...defaultProps} />);
    expect(screen.getByRole("textbox", { name: /account id/i })).toHaveValue(
      "0"
    );
  });
});
