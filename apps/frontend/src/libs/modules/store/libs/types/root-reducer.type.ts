import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type pointsOfInterestDetailsReducer } from "~/modules/points-of-interest/points-of-interest.js";
import { type reducer as usersReducer } from "~/modules/users/users.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	pointsOfInterestDetails: ReturnType<typeof pointsOfInterestDetailsReducer>;
	users: ReturnType<typeof usersReducer>;
};

export { type RootReducer };
