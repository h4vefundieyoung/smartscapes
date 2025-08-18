import { encryption } from "~/libs/modules/encryption/libs/encryption.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { tokenService } from "~/libs/modules/token/token.js";
import { userService } from "~/modules/users/users.js";

import { fileService } from "../files/files.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService({
	encryptionService: encryption,
	fileService,
	tokenService,
	userService,
});

const authController = new AuthController(logger, authService);

export { authController };
