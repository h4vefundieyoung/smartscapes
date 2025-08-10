import { type APIRequestContext } from "@playwright/test";

import { AuthController } from "./auth-controller.js";

class ApiController {
	public readonly auth: AuthController;

	public constructor(request: APIRequestContext) {
		this.auth = new AuthController(request);
	}
}

export { ApiController };
