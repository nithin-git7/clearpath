/** Countries where APS (Akademische Pruefstelle) is commonly required for Germany applications. */

export interface ApsCountry {
  name: string;
  code: string;
  portal: string;
  last_verified: string;
}

export const APS_COUNTRIES: ApsCountry[] = [
  {
    name: "India",
    code: "IN",
    portal: "https://www.aps-india.de/",
    last_verified: "2026-07-04",
  },
  {
    name: "China",
    code: "CN",
    portal: "https://www.aps.org.cn/",
    last_verified: "2026-07-04",
  },
  {
    name: "Vietnam",
    code: "VN",
    portal: "https://www.aps.org.cn/en/vietnam/",
    last_verified: "2026-07-04",
  },
  {
    name: "Mongolia",
    code: "MN",
    portal: "https://www.aps.org.cn/en/mongolia/",
    last_verified: "2026-07-04",
  },
];

export function lookupApsCountry(query: string): ApsCountry | null {
  const needle = query.trim().toLowerCase();
  if (!needle) return null;
  return (
    APS_COUNTRIES.find(
      (c) =>
        c.name.toLowerCase() === needle ||
        c.code.toLowerCase() === needle ||
        c.name.toLowerCase().includes(needle),
    ) ?? null
  );
}
