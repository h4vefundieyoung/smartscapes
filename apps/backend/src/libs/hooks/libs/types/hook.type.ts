import { type ServerApplicationRouteParameters } from "~/libs/modules/server-application/server-application.js";

type Hook = Exclude<
	ServerApplicationRouteParameters["preHandlers"],
	undefined
>[0];

export { type Hook };
