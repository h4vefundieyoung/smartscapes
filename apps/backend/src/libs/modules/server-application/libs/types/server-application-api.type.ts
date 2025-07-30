import {
	type APIDoc as APIDocument,
	type ServerApplicationRouteParameters,
	type WhiteRoute,
} from "./types.js";

type ServerApplicationApi = {
	basePath: string;
	generateDoc(title: string): APIDocument;
	injectWhiteRoutes(whiteRoutes: WhiteRoute[]): void;
	routes: ServerApplicationRouteParameters[];
	version: string;
	whiteRoutes: WhiteRoute[];
};

export { type ServerApplicationApi };
