import {
	type APIDoc as APIDocument,
	type ServerApplicationRouteParameters,
	type WhiteRoute,
} from "./types.js";

type ServerApplicationApi = {
	basePath: string;
	generateDoc(title: string): APIDocument;
	generateWhiteRoutes(): WhiteRoute[];
	routes: ServerApplicationRouteParameters[];
	version: string;
};

export { type ServerApplicationApi };
