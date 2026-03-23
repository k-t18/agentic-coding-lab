import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export interface UseLookupResult {
  description: string | null;
  isLoading: boolean;
  isNotFound: boolean;
  error: string | null;
}

interface UseLookupParams {
  id: string;
  doctypeName: string;
  descriptionField: string;
  enabled: boolean;
}

function isApiError(err: unknown): err is { status: number } {
  return typeof err === "object" && err !== null && "status" in err;
}

export function useLookup({
  id,
  doctypeName,
  descriptionField,
  enabled,
}: UseLookupParams): UseLookupResult {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect: debounce side-effect — requires timer cleanup to prevent stale calls
  useEffect(() => {
    if (!enabled || !id) {
      setDescription(null);
      setIsLoading(false);
      setIsNotFound(false);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      setIsNotFound(false);

      try {
        const response = await apiClient.get<{ data: Record<string, unknown> }>(
          `/api/resource/${doctypeName}/${id}`
        );
        const value = response.data[descriptionField];
        setDescription(typeof value === "string" ? value : null);
      } catch (err: unknown) {
        if (isApiError(err) && err.status === 404) {
          setIsNotFound(true);
        } else {
          setError("Failed to fetch record");
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id, doctypeName, descriptionField, enabled]);

  return { description, isLoading, isNotFound, error };
}
