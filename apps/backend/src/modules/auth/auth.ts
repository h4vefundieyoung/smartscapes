import { encryption } from "~/libs/modules/encryption/libs/encryption.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { userRepository, userService } from "~/modules/users/users.js";
import { tokenService } from "~/libs/modules/token/token.js";


import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

//const authService = new AuthService(userService, encryption, userRepository);
const authService = new AuthService({ tokenService, userService });

const authController = new AuthController(logger, authService);

export { authController };
