import {
	type APIDoc as APIDocument,
	type ServerApplicationRouteParameters,
} from "./types.js";

type ServerApplicationApi = {
	basePath: string;
	generateDoc(title: string): APIDocument;
	routes: ServerApplicationRouteParameters[];
	version: string;
};

export { type ServerApplicationApi };
