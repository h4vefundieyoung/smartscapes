import swaggerJsdoc from "swagger-jsdoc";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

import {
	type APIDoc as APIDocument,
	type ServerApplicationApi,
	type ServerApplicationRouteParameters,
	type WhiteRoute,
} from "./libs/types/types.js";

class BaseServerApplicationApi implements ServerApplicationApi {
	public basePath: string;

	public routes: ServerApplicationRouteParameters[];

	public version: string;

	private config: Config;

	public constructor(
		version: string,
		config: Config,
		...handlers: ServerApplicationRouteParameters[]
	) {
		this.version = version;
		this.config = config;
		this.basePath = `/api/${this.version}`;

		const healthRoute: ServerApplicationRouteParameters = {
			handler: async (_, reply) =>
				await reply.status(HTTPCode.OK).send({ ok: true }),
			method: "GET",
			path: `${this.basePath}/health`,
		};

		const apiRoutes = handlers.map((handler) => ({
			...handler,
			path: `${this.basePath}${handler.path}`,
		}));

		this.routes = [healthRoute, ...apiRoutes];
	}

	public generateDoc(title: string): APIDocument {
		const isLocalEnvironment =
			this.config.ENV.APP.ENVIRONMENT === AppEnvironment.LOCAL;
		const controllerExtension = isLocalEnvironment ? "ts" : "js";

		return swaggerJsdoc({
			apis: [`src/modules/**/*.controller.${controllerExtension}`],
			definition: {
				components: {
					securitySchemes: {
						bearerAuth: {
							bearerFormat: "JWT",
							scheme: "bearer",
							type: "http",
						},
					},
				},
				info: {
					title,
					version: this.version,
				},
				openapi: "3.1.0",
				servers: [{ url: this.basePath }],
			},
			failOnErrors: true,
		}) as APIDocument;
	}

	public generateWhiteList(whiteRoutes: WhiteRoute[]): WhiteRoute[] {
		return whiteRoutes.map((whiteRoute) => ({
			...whiteRoute,
			path: `${this.basePath}${whiteRoute.path}`,
		}));
	}
}

export { BaseServerApplicationApi };
