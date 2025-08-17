import { type reducer as appReducer } from "~/modules/app/app.js";
import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type reducer as pointsOfInterestReducer } from "~/modules/points-of-interest/points-of-interest.js";
import { type reducer as routeReducer } from "~/modules/routes/routes.js";
import { type reducer as usersReducer } from "~/modules/users/users.js";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	pointsOfInterest: ReturnType<typeof pointsOfInterestReducer>;
	route: ReturnType<typeof routeReducer>;
	users: ReturnType<typeof usersReducer>;
};

export { type RootReducer };
