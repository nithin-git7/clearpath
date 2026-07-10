"use client";

import { useCallback, useEffect, useState } from "react";

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
    return Array.isArray(parsed) ? (parsed as string[]) : [];
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
    return parsed && typeof parsed === "object" ? (parsed as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function useStoredList(key: string) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount to avoid SSR hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readList(key));
    setReady(true);
  }, [key]);

  const persist = useCallback(
    (next: string[]) => {
      setItems(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(next));
      }
    },
    [key],
  );

  const toggle = useCallback(
    (id: string) => {
      persist(items.includes(id) ? items.filter((entry) => entry !== id) : [...items, id]);
    },
    [items, persist],
  );

  const has = useCallback((id: string) => items.includes(id), [items]);
  const clear = useCallback(() => persist([]), [persist]);

  return { items, ready, toggle, has, clear };
}

export function useShortlist() {
  return useStoredList(SHORTLIST_KEY);
}

export function useCompareList() {
  const { items, ready, toggle, has, clear } = useStoredList(COMPARE_KEY);
  const add = useCallback(
    (id: string) => {
      if (items.includes(id) || items.length >= 3) return;
      toggle(id);
    },
    [items, toggle],
  );
  return { items, ready, toggle, has, clear, add, full: items.length >= 3 };
}

export function useSavedDeadlines() {
  return useStoredList(DEADLINES_KEY);
}

export function useJourneyProgress() {
  const [steps, setSteps] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount to avoid SSR hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSteps(readMap(PROGRESS_KEY));
    setReady(true);
  }, []);

  const persist = useCallback((next: Record<string, boolean>) => {
    setSteps(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist({ ...steps, [id]: !steps[id] });
    },
    [steps, persist],
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
        if (typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        }
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
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export const ROADMAP_DRAFT_STORAGE = ROADMAP_DRAFT_KEY;
export const ROADMAP_RESULT_STORAGE = ROADMAP_RESULT_KEY;
