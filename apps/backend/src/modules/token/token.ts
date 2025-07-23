import { config } from "~/libs/modules/config/config.js";

import { BaseToken } from "./token.service.js";

const tokenService = new BaseToken({ config });

export { tokenService };
export {
	type TokenPayload,
	type UserAuthResponseDto,
} from "./libs/types/types.js";
export { type BaseToken } from "./token.service.js";
