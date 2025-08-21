import { type APIRequestContext } from "@playwright/test";

import { AuthController } from "./auth-controller.js";
import { POIController } from "./poi-controler.js";

class ApiController {
	public readonly auth: AuthController;

	public readonly poi: POIController;

	public constructor(request: APIRequestContext) {
		this.auth = new AuthController(request);
		this.poi = new POIController(request);
	}
}

export { ApiController };
