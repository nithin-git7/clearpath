import { n as apiGet } from "./api-CoFO66dD.js";
//#region lib/catalog.ts
function getUniversities(params) {
	return apiGet("/api/universities", params);
}
function getUniversity(id) {
	return apiGet(`/api/universities/${id}`);
}
function getPrograms(params) {
	return apiGet("/api/programs", params);
}
function getProgram(id) {
	return apiGet(`/api/programs/${id}`);
}
function getDeadlines(intake) {
	return apiGet("/api/deadlines", intake ? { intake } : void 0);
}
function getCostOfLiving() {
	return apiGet("/api/cost-of-living");
}
function formatEuro(amount) {
	return amount === 0 ? "No tuition fee" : new Intl.NumberFormat("en-DE", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0
	}).format(amount);
}
function formatDate(value) {
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return value;
	return parsed.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
//#endregion
export { getProgram as a, getUniversity as c, getDeadlines as i, formatEuro as n, getPrograms as o, getCostOfLiving as r, getUniversities as s, formatDate as t };
