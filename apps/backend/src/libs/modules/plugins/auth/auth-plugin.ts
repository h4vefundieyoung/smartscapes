import { userService } from "~/modules/users/users.js";

import { AuthPlugin } from "./base-auth-plugin.js";

const authPlugin = new AuthPlugin({}, userService);

export { authPlugin };
