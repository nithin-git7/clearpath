import { b as require_react, w as __toESM } from "../index.js";
//#region lib/storage.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SHORTLIST_KEY = "clearpath:shortlist";
var COMPARE_KEY = "clearpath:compare";
var ROADMAP_DRAFT_KEY = "clearpath:roadmap-draft";
var ROADMAP_RESULT_KEY = "clearpath:roadmap-result";
var CHECKLIST_KEY = "clearpath:checklists";
var DEADLINES_KEY = "clearpath:saved-deadlines";
var PROGRESS_KEY = "clearpath:journey-progress";
function readList(key) {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(key);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? [...new Set(parsed.filter((item) => typeof item === "string" && item.length > 0))] : [];
	} catch {
		return [];
	}
}
function readMap(key) {
	if (typeof window === "undefined") return {};
	try {
		const raw = window.localStorage.getItem(key);
		const parsed = raw ? JSON.parse(raw) : {};
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
		return Object.fromEntries(Object.entries(parsed).filter((entry) => entry[0].length > 0 && typeof entry[1] === "boolean"));
	} catch {
		return {};
	}
}
function writeStorage(key, value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function useStoredList(key) {
	const [items, setItems] = (0, import_react.useState)([]);
	const itemsRef = (0, import_react.useRef)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = readList(key);
		itemsRef.current = stored;
		setItems(stored);
		setReady(true);
	}, [key]);
	const persist = (0, import_react.useCallback)((next) => {
		const normalized = [...new Set(next.filter((item) => item.length > 0))];
		itemsRef.current = normalized;
		setItems(normalized);
		writeStorage(key, normalized);
	}, [key]);
	return {
		items,
		ready,
		toggle: (0, import_react.useCallback)((id) => {
			const current = itemsRef.current;
			persist(current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]);
		}, [persist]),
		has: (0, import_react.useCallback)((id) => items.includes(id), [items]),
		clear: (0, import_react.useCallback)(() => persist([]), [persist]),
		replace: (0, import_react.useCallback)((next) => persist(next), [persist])
	};
}
function useShortlist() {
	return useStoredList(SHORTLIST_KEY);
}
function useCompareList() {
	const { items, ready, toggle, has, clear, replace } = useStoredList(COMPARE_KEY);
	return {
		items,
		ready,
		toggle,
		has,
		clear,
		replace,
		add: (0, import_react.useCallback)((id) => {
			if (items.includes(id) || items.length >= 3) return;
			toggle(id);
		}, [items, toggle]),
		full: items.length >= 3
	};
}
function useSavedDeadlines() {
	return useStoredList(DEADLINES_KEY);
}
function useJourneyProgress() {
	const [steps, setSteps] = (0, import_react.useState)({});
	const stepsRef = (0, import_react.useRef)({});
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = readMap(PROGRESS_KEY);
		stepsRef.current = stored;
		setSteps(stored);
		setReady(true);
	}, []);
	const persist = (0, import_react.useCallback)((next) => {
		stepsRef.current = next;
		setSteps(next);
		writeStorage(PROGRESS_KEY, next);
	}, []);
	return {
		steps,
		ready,
		toggle: (0, import_react.useCallback)((id) => {
			const current = stepsRef.current;
			persist({
				...current,
				[id]: !current[id]
			});
		}, [persist]),
		completedCount: Object.values(steps).filter(Boolean).length
	};
}
function useChecklist(programId, itemIds) {
	const storageKey = `${CHECKLIST_KEY}:${programId}`;
	const [state, setState] = (0, import_react.useState)({});
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setState(readMap(storageKey));
		setReady(true);
	}, [storageKey]);
	return {
		state,
		ready,
		toggle: (0, import_react.useCallback)((id) => {
			setState((current) => {
				const next = {
					...current,
					[id]: !current[id]
				};
				writeStorage(storageKey, next);
				return next;
			});
		}, [storageKey]),
		completedCount: itemIds.filter((id) => state[id]).length,
		total: itemIds.length
	};
}
function readJson(key) {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function writeJson(key, value) {
	writeStorage(key, value);
}
var ROADMAP_DRAFT_STORAGE = ROADMAP_DRAFT_KEY;
var ROADMAP_RESULT_STORAGE = ROADMAP_RESULT_KEY;
//#endregion
export { useCompareList as a, useShortlist as c, useChecklist as i, writeJson as l, ROADMAP_RESULT_STORAGE as n, useJourneyProgress as o, readJson as r, useSavedDeadlines as s, ROADMAP_DRAFT_STORAGE as t };
