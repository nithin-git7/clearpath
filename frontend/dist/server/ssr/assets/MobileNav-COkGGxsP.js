import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-2ZhP7GoM.js";
import { n as usePathname } from "./navigation-DG8DKWKJ.js";
//#region components/MobileNav.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		href: "/hub",
		label: "Hub"
	},
	{
		href: "/explore",
		label: "Explore"
	},
	{
		href: "/roadmap",
		label: "Roadmap"
	},
	{
		href: "/explain",
		label: "Explain"
	},
	{
		href: "/deadlines",
		label: "Deadlines"
	},
	{
		href: "/finance",
		label: "Finance"
	},
	{
		href: "/compare",
		label: "Compare"
	},
	{
		href: "/guides",
		label: "Guides"
	},
	{
		href: "/search",
		label: "Search"
	}
];
function MobileNav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = usePathname();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lg:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-expanded": open,
			"aria-controls": "mobile-menu",
			onClick: () => setOpen((value) => !value),
			className: "inline-flex min-h-10 items-center rounded-full border border-forest-700/25 px-3 text-sm font-semibold text-forest-800",
			children: "Menu"
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			id: "mobile-menu",
			"aria-label": "Mobile navigation",
			className: "absolute left-0 right-0 top-full border-b border-forest-900/10 bg-cream-50 px-5 py-4 shadow-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: link.href,
					onClick: () => setOpen(false),
					className: `block rounded-lg px-3 py-2 text-sm font-medium ${pathname === link.href || pathname.startsWith(`${link.href}/`) ? "bg-forest-900 text-white" : "text-slate-700 hover:bg-white"}`,
					children: link.label
				}) }, link.href))
			})
		})]
	});
}
//#endregion
export { MobileNav as default };
