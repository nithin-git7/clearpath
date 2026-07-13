import { handleClearPathApi } from "../../../worker/clearpath-api";

async function handle(request: Request): Promise<Response> {
  return (
    (await handleClearPathApi(request)) ??
    Response.json({ detail: "Not found" }, { status: 404 })
  );
}

export {
  handle as GET,
  handle as POST,
};
