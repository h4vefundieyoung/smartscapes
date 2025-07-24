import { userService } from "~/modules/users/users.js";

import { tokenService } from "../../token/token.js";
import { BaseAuthPlugin } from "./base-auth.plugin.js";

const authPlugin = new BaseAuthPlugin(tokenService, userService);

export { authPlugin };
