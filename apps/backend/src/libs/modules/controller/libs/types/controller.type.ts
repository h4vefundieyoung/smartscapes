import { type ServerApplicationRouteParameters } from "~/libs/modules/server-application/server-application.js";

import {
	type APIHandlerOptions,
	type ControllerRouteParameters,
} from "./types.js";

type Controller = {
	addRoute(options: ControllerRouteParameters<APIHandlerOptions>): void;
	routes: ServerApplicationRouteParameters[];
};

export { type Controller };
