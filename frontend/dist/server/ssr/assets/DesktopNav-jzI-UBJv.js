import { t as require_jsx_runtime } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { n as usePathname } from "./navigation-DG8DKWKJ.js";
//#region components/DesktopNav.tsx
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		href: "/explore",
		label: "Explore"
	},
	{
		href: "/roadmap",
		label: "Roadmap"
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
		href: "/guides",
		label: "Guides"
	},
	{
		href: "/search",
		label: "Search"
	}
];
function DesktopNav() {
	const pathname = usePathname();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Primary navigation",
		className: "hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex",
		children: LINKS.map((link) => {
			const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: `nav-link ${active ? "text-forest-700" : ""}`,
				href: link.href,
				"aria-current": active ? "page" : void 0,
				children: link.label
			}, link.href);
		})
	});
}
//#endregion
export { DesktopNav as default };
