"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LookupInputFieldProps } from "@/types/shared/lookup.types";
import { sanitizeNumericInput } from "../../../../utils/sanitizeNumericInput";
import { useLookup } from "@/hooks/shared/useLookup";

const BLOCKED_KEYS = [".", "-", "+", "e", "E"];

export function LookupInputField({
  label,
  mode,
  doctypeName,
  descriptionField = "description",
  idPlaceholder = "0",
  descriptionPlaceholder = "Description",
  descriptionEnabled,
  disabled = false,
}: LookupInputFieldProps) {
  const [idValue, setIdValue] = useState("0");
  const [manualDescription, setManualDescription] = useState("");

  const isLookupMode = mode === "lookup";

  const {
    description: lookedUpDescription,
    isLoading,
    isNotFound,
  } = useLookup({
    id: idValue,
    doctypeName: doctypeName ?? "",
    descriptionField,
    enabled: isLookupMode && idValue !== "",
  });

  // In lookup mode: show the autofilled value; fall back to manual input after 404 or in manual-entry mode
  const displayedDescription =
    isLookupMode && !isNotFound && lookedUpDescription !== null
      ? lookedUpDescription
      : manualDescription;

  // Description is enabled when: prop override, manual-entry mode (default), or after a 404
  const isDescriptionEnabled =
    descriptionEnabled ?? (mode === "manual-entry" || isNotFound);
  const isDescriptionDisabled = disabled || !isDescriptionEnabled;

  function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const sanitized = sanitizeNumericInput(e.target.value);
    setIdValue(sanitized);
    if (sanitized === "") {
      setManualDescription("");
    }
  }

  function handleIdKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (BLOCKED_KEYS.includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleIdPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    setIdValue(sanitizeNumericInput(pasted));
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-label text-text-secondary">{label}</span>

      <div className="flex overflow-hidden rounded-sm border border-border-default">
        {/* ID input — type="text" + inputMode for full sanitization control */}
        <input
          type="text"
          inputMode="numeric"
          aria-label={`${label} ID`}
          placeholder={idPlaceholder}
          value={idValue}
          disabled={disabled}
          onChange={handleIdChange}
          onKeyDown={handleIdKeyDown}
          onPaste={handleIdPaste}
          className={cn(
            "w-24 border-r border-border-default bg-surface-white px-3 py-2",
            "text-b3 text-text-primary placeholder:text-text-disabled",
            "focus:outline-none focus:ring-2 focus:ring-border-focus",
            "disabled:cursor-not-allowed disabled:bg-surface-light disabled:text-text-disabled"
          )}
        />

        {/* Description input */}
        <div className="relative flex flex-1">
          <input
            type="text"
            aria-label={`${label} Description`}
            placeholder={descriptionPlaceholder}
            value={displayedDescription}
            disabled={isDescriptionDisabled}
            onChange={(e) => setManualDescription(e.target.value)}
            className={cn(
              "w-full bg-surface-white px-3 py-2",
              "text-b3 text-text-primary placeholder:text-text-disabled",
              "focus:outline-none focus:ring-2 focus:ring-border-focus",
              "disabled:cursor-not-allowed disabled:bg-surface-light disabled:text-text-disabled"
            )}
          />
          {/* Loading indicator */}
          {isLoading && (
            <span
              role="status"
              aria-label="Loading"
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-border-default border-t-action-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}
