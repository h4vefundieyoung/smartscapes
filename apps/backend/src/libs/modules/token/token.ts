import { config } from "~/libs/modules/config/config.js";

import { BaseToken } from "./base-token.module.js";
import { TokenBlacklistService } from "./token-blacklist.service.js";

const { JWS_ALGORITHM, JWT_SECRET, TOKEN_EXPIRATION } = config.ENV.AUTH;

const tokenBlacklistService = new TokenBlacklistService();

const tokenService = new BaseToken({
	jwtAlgorithm: JWS_ALGORITHM,
	jwtSecret: JWT_SECRET,
	tokenExpirationTime: TOKEN_EXPIRATION,
});

export { tokenBlacklistService, tokenService };
export { type BaseToken } from "./base-token.module.js";
