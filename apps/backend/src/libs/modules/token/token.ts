import { config } from "~/libs/modules/config/config.js";

import { BaseToken } from "./base-token.module.js";

const tokenService = new BaseToken({ config });

export { tokenService };
export { type BaseToken } from "./base-token.module.js";
export {
	type TokenPayload,
	type UserAuthResponseDto,
} from "./libs/types/types.js";
