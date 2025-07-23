import { userService } from "~/modules/users/users.js";

import { BaseAuthPlugin } from "./base-auth-plugin.js";

const authPlugin = new BaseAuthPlugin({}, userService);

export { authPlugin };
