"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SHORTLIST_KEY = "clearpath:shortlist";
const COMPARE_KEY = "clearpath:compare";
const ROADMAP_DRAFT_KEY = "clearpath:roadmap-draft";
const ROADMAP_RESULT_KEY = "clearpath:roadmap-result";
const CHECKLIST_KEY = "clearpath:checklists";
const DEADLINES_KEY = "clearpath:saved-deadlines";
const PROGRESS_KEY = "clearpath:journey-progress";

function readList(key: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((item): item is string => typeof item === "string" && item.length > 0))]
      : [];
  } catch {
    return [];
  }
}

function readMap(key: string): Record<string, boolean> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, boolean] => entry[0].length > 0 && typeof entry[1] === "boolean",
      ),
    );
  } catch {
    return {};
  }
}

function writeStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the in-memory interaction working when storage is blocked or full.
  }
}

function useStoredList(key: string) {
  const [items, setItems] = useState<string[]>([]);
  const itemsRef = useRef<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readList(key);
    itemsRef.current = stored;
    // Hydrate from localStorage after mount to avoid SSR hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(stored);
    setReady(true);
  }, [key]);

  const persist = useCallback(
    (next: string[]) => {
      const normalized = [...new Set(next.filter((item) => item.length > 0))];
      itemsRef.current = normalized;
      setItems(normalized);
      writeStorage(key, normalized);
    },
    [key],
  );

  const toggle = useCallback(
    (id: string) => {
      const current = itemsRef.current;
      persist(current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]);
    },
    [persist],
  );

  const has = useCallback((id: string) => items.includes(id), [items]);
  const clear = useCallback(() => persist([]), [persist]);
  const replace = useCallback((next: string[]) => persist(next), [persist]);

  return { items, ready, toggle, has, clear, replace };
}

export function useShortlist() {
  return useStoredList(SHORTLIST_KEY);
}

export function useCompareList() {
  const { items, ready, toggle, has, clear, replace } = useStoredList(COMPARE_KEY);
  const add = useCallback(
    (id: string) => {
      if (items.includes(id) || items.length >= 3) return;
      toggle(id);
    },
    [items, toggle],
  );
  return { items, ready, toggle, has, clear, replace, add, full: items.length >= 3 };
}

export function useSavedDeadlines() {
  return useStoredList(DEADLINES_KEY);
}

export function useJourneyProgress() {
  const [steps, setSteps] = useState<Record<string, boolean>>({});
  const stepsRef = useRef<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount to avoid SSR hydration mismatches.
    const stored = readMap(PROGRESS_KEY);
    stepsRef.current = stored;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSteps(stored);
    setReady(true);
  }, []);

  const persist = useCallback((next: Record<string, boolean>) => {
    stepsRef.current = next;
    setSteps(next);
    writeStorage(PROGRESS_KEY, next);
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const current = stepsRef.current;
      persist({ ...current, [id]: !current[id] });
    },
    [persist],
  );

  const completedCount = Object.values(steps).filter(Boolean).length;

  return { steps, ready, toggle, completedCount };
}

export function useChecklist(programId: string, itemIds: string[]) {
  const storageKey = `${CHECKLIST_KEY}:${programId}`;
  const [state, setState] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount to avoid SSR hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readMap(storageKey));
    setReady(true);
  }, [storageKey]);

  const toggle = useCallback(
    (id: string) => {
      setState((current) => {
        const next = { ...current, [id]: !current[id] };
        writeStorage(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  const completedCount = itemIds.filter((id) => state[id]).length;

  return { state, ready, toggle, completedCount, total: itemIds.length };
}

export function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown): void {
  writeStorage(key, value);
}

export const ROADMAP_DRAFT_STORAGE = ROADMAP_DRAFT_KEY;
export const ROADMAP_RESULT_STORAGE = ROADMAP_RESULT_KEY;
