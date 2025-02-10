import { useState, useEffect } from "react";
import { storageHelper } from "./storage";

export function useStorage<T>(key: string, defaultValue: T, type: "local" | "session" = "local") {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storageHelper.get(key, type);
    return item !== null ? item : defaultValue;
  });

  useEffect(() => {
    storageHelper.set(key, storedValue, type);
  }, [key, storedValue, type]);

  return [storedValue, setStoredValue] as const;
}