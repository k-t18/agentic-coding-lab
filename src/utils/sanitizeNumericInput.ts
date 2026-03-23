/**
 * Strips all non-digit characters from a string.
 * Blocks decimals, negatives, and alphabetic characters.
 */
export function sanitizeNumericInput(value: string): string {
  return value.replace(/\D/g, "");
}
