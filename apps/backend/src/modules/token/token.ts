import { config } from "~/libs/modules/config/config.js";

import { TokenService } from "./token.service.js";

const tokenService = new TokenService({ config });

export { tokenService };
export { type TokenPayload } from "./libs/types/types.js";
export { type TokenService } from "./token.service.js";
