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
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function readMap(key) {
	if (typeof window === "undefined") return {};
	try {
		const raw = window.localStorage.getItem(key);
		const parsed = raw ? JSON.parse(raw) : {};
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}
function useStoredList(key) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setItems(readList(key));
		setReady(true);
	}, [key]);
	const persist = (0, import_react.useCallback)((next) => {
		setItems(next);
		if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(next));
	}, [key]);
	return {
		items,
		ready,
		toggle: (0, import_react.useCallback)((id) => {
			persist(items.includes(id) ? items.filter((entry) => entry !== id) : [...items, id]);
		}, [items, persist]),
		has: (0, import_react.useCallback)((id) => items.includes(id), [items]),
		clear: (0, import_react.useCallback)(() => persist([]), [persist])
	};
}
function useShortlist() {
	return useStoredList(SHORTLIST_KEY);
}
function useCompareList() {
	const { items, ready, toggle, has, clear } = useStoredList(COMPARE_KEY);
	return {
		items,
		ready,
		toggle,
		has,
		clear,
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
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSteps(readMap(PROGRESS_KEY));
		setReady(true);
	}, []);
	const persist = (0, import_react.useCallback)((next) => {
		setSteps(next);
		if (typeof window !== "undefined") window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
	}, []);
	return {
		steps,
		ready,
		toggle: (0, import_react.useCallback)((id) => {
			persist({
				...steps,
				[id]: !steps[id]
			});
		}, [steps, persist]),
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
				if (typeof window !== "undefined") window.localStorage.setItem(storageKey, JSON.stringify(next));
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
	if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
}
var ROADMAP_DRAFT_STORAGE = ROADMAP_DRAFT_KEY;
var ROADMAP_RESULT_STORAGE = ROADMAP_RESULT_KEY;
//#endregion
export { useCompareList as a, useShortlist as c, useChecklist as i, writeJson as l, ROADMAP_RESULT_STORAGE as n, useJourneyProgress as o, readJson as r, useSavedDeadlines as s, ROADMAP_DRAFT_STORAGE as t };
