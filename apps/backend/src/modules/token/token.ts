import { config } from "~/libs/modules/config/config.js";

import { TokenService } from "./token.service.js";

const tokenService = new TokenService({ config });

export { tokenService };
export {
	type TokenPayload,
	type UserAuthResponseDto,
} from "./libs/types/types.js";
export { type TokenService } from "./token.service.js";
