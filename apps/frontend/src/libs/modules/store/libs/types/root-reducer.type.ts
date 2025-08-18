import { type reducer as appReducer } from "~/modules/app/app.js";
import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type reducer as exploreReducer } from "~/modules/explore/explore.js";
import { type reducer as locationReducer } from "~/modules/location/location.js";
import { type reducer as pointsOfInterestReducer } from "~/modules/points-of-interest/points-of-interest.js";
import { type reducer as routeReducer } from "~/modules/routes/routes.js";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	explore: ReturnType<typeof exploreReducer>;
	location: ReturnType<typeof locationReducer>;
	pointsOfInterest: ReturnType<typeof pointsOfInterestReducer>;
	route: ReturnType<typeof routeReducer>;
};

export { type RootReducer };
