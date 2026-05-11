import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LookupInputField } from "@/components/shared/form-fields/LookupInputField/LookupInputField";
import { apiClient } from "@/lib/api-client";
import { defaultProps } from "./lookupInputField.helpers";

vi.mock("@/lib/api-client", () => ({
  apiClient: { get: vi.fn() },
}));

describe("LookupInputField — Phase 4: Debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(apiClient.get).mockReturnValue(new Promise(() => {}));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("lookup does not fire immediately upon ID entry", async () => {
    render(
      <LookupInputField
        {...defaultProps}
        mode="lookup"
        doctypeName="Customer"
      />
    );
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    await act(async () => {
      fireEvent.change(idInput, { target: { value: "5" } });
    });

    expect(apiClient.get).not.toHaveBeenCalled();
  });

  it("lookup fires exactly after 500ms of inactivity", async () => {
    render(
      <LookupInputField
        {...defaultProps}
        mode="lookup"
        doctypeName="Customer"
      />
    );
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    await act(async () => {
      fireEvent.change(idInput, { target: { value: "5" } });
      vi.advanceTimersByTime(499);
    });
    expect(apiClient.get).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(1);
    });
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  it("rapid typing results in only one debounced lookup call", async () => {
    render(
      <LookupInputField
        {...defaultProps}
        mode="lookup"
        doctypeName="Customer"
      />
    );
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    await act(async () => {
      fireEvent.change(idInput, { target: { value: "1" } });
      vi.advanceTimersByTime(200);
      fireEvent.change(idInput, { target: { value: "12" } });
      vi.advanceTimersByTime(200);
      fireEvent.change(idInput, { target: { value: "123" } });
      vi.advanceTimersByTime(500);
    });

    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  it("lookup is cancelled when ID becomes empty before debounce completes", async () => {
    render(
      <LookupInputField
        {...defaultProps}
        mode="lookup"
        doctypeName="Customer"
      />
    );
    const idInput = screen.getByRole("textbox", { name: /account id/i });

    await act(async () => {
      fireEvent.change(idInput, { target: { value: "5" } });
      vi.advanceTimersByTime(200);
      fireEvent.change(idInput, { target: { value: "" } });
      vi.advanceTimersByTime(500);
    });

    expect(apiClient.get).not.toHaveBeenCalled();
  });
});
