export type LookupMode = "lookup" | "manual-entry";

export interface LookupInputFieldProps {
  mode: LookupMode;
  doctypeName?: string;
  /** The response field key that holds the description value. Defaults to "description". */
  descriptionField?: string;

  label: string;
  idPlaceholder?: string;
  descriptionPlaceholder?: string;

  descriptionEnabled?: boolean;
  disabled?: boolean;
}
