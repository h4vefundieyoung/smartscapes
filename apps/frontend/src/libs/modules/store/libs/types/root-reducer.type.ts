import { type reducer as appReducer } from "~/modules/app/app.js";
import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type reducer as exploreReducer } from "~/modules/explore/explore.js";
import { type reducer as locationReducer } from "~/modules/location/location.js";
import {
	type pointOfInterestDetailsReducer,
	type pointsOfInterestReducer,
} from "~/modules/points-of-interest/points-of-interest.js";
import { type reducer as routeReducer } from "~/modules/routes/routes.js";
import { type reducer as userRouteReducer } from "~/modules/user-routes/user-routes.js";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	explore: ReturnType<typeof exploreReducer>;
	location: ReturnType<typeof locationReducer>;
	pointOfInterestDetails: ReturnType<typeof pointOfInterestDetailsReducer>;
	pointsOfInterest: ReturnType<typeof pointsOfInterestReducer>;
	route: ReturnType<typeof routeReducer>;
	userRoute: ReturnType<typeof userRouteReducer>;
};

export { type RootReducer };
