import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type reducer as routesReducer } from "~/modules/routes/routes.js";
import { type reducer as usersReducer } from "~/modules/users/users.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	routes: ReturnType<typeof routesReducer>;
	users: ReturnType<typeof usersReducer>;
};

export { type RootReducer };
