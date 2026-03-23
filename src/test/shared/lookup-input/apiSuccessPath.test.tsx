import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LookupInputField } from "@/components/shared/form-fields/LookupInputField/LookupInputField";
import { apiClient } from "@/lib/api-client";
import { defaultProps } from "./lookupInputField.helpers";

vi.mock("@/lib/api-client", () => ({
  apiClient: { get: vi.fn() },
}));

describe("LookupInputField — Phase 5: API Success Path", () => {
  const lookupProps = {
    ...defaultProps,
    mode: "lookup" as const,
    doctypeName: "Charge Master",
    descriptionField: "charge_description",
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("calls the API with the correct doctypeName in the path", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { charge_description: "Test Desc" },
    });
    render(<LookupInputField {...lookupProps} />);

    await act(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /account id/i }), {
        target: { value: "101" },
      });
      vi.advanceTimersByTime(500);
    });

    expect(vi.mocked(apiClient.get).mock.calls[0][0]).toContain(
      "Charge Master"
    );
  });

  it("calls the API with the specific entered ID", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { charge_description: "Test Desc" },
    });
    render(<LookupInputField {...lookupProps} />);

    await act(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /account id/i }), {
        target: { value: "101" },
      });
      vi.advanceTimersByTime(500);
    });

    expect(vi.mocked(apiClient.get).mock.calls[0][0]).toContain("101");
  });

  it("auto-fills description using the configured descriptionField on success", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { charge_description: "101 Desc" },
    });
    render(<LookupInputField {...lookupProps} />);

    await act(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /account id/i }), {
        target: { value: "101" },
      });
      await vi.runAllTimersAsync();
    });

    expect(
      screen.getByRole("textbox", { name: /account description/i })
    ).toHaveValue("101 Desc");
  });

  it("description remains disabled after successful lookup", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { charge_description: "101 Desc" },
    });
    render(<LookupInputField {...lookupProps} />);

    await act(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /account id/i }), {
        target: { value: "101" },
      });
      await vi.runAllTimersAsync();
    });

    expect(
      screen.getByRole("textbox", { name: /account description/i })
    ).toHaveValue("101 Desc");
    expect(
      screen.getByRole("textbox", { name: /account description/i })
    ).toBeDisabled();
  });

  it("shows a loading indicator while fetch is in progress", async () => {
    let resolveRequest: (val: unknown) => void;
    vi.mocked(apiClient.get).mockReturnValue(
      new Promise((r) => {
        resolveRequest = r;
      })
    );
    render(<LookupInputField {...lookupProps} />);

    await act(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /account id/i }), {
        target: { value: "101" },
      });
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole("status")).toBeInTheDocument();

    await act(async () => {
      resolveRequest!({ data: { charge_description: "101 Desc" } });
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
