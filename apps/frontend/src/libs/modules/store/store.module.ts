import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { storage } from "~/libs/modules/storage/storage.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { reducer as appReducer } from "~/modules/app/app.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import { reducer as exploreReducer } from "~/modules/explore/explore.js";
import { reducer as locationReducer } from "~/modules/location/location.js";
import {
	pointOfInterestApi,
	pointOfInterestDetailsReducer,
	pointsOfInterestReducer,
} from "~/modules/points-of-interest/points-of-interest.js";
import {
	constructRouteReducer,
	routeReducer,
	routesApi,
} from "~/modules/routes/routes.js";
import {
	userRouteApi,
	reducer as userRouteReducer,
} from "~/modules/user-routes/user-routes.js";
import { userApi } from "~/modules/users/users.js";

import { type ExtraArguments, type RootReducer } from "./libs/types/types.js";
import { handleErrorMiddleware } from "./middlewares/middlewares.js";

class Store {
	public instance: ReturnType<
		typeof configureStore<
			RootReducer,
			UnknownAction,
			Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
		>
	>;

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			pointOfInterestApi,
			routesApi,
			storage,
			toastNotifier,
			userApi,
			userRouteApi,
		};
	}

	public constructor(config: Config) {
		this.instance = configureStore({
			devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
			middleware: (getDefaultMiddleware) => {
				return getDefaultMiddleware({
					thunk: {
						extraArgument: this.extraArguments,
					},
				}).prepend(handleErrorMiddleware(this.extraArguments));
			},
			reducer: {
				app: appReducer,
				auth: authReducer,
				constructRoute: constructRouteReducer,
				explore: exploreReducer,
				location: locationReducer,
				pointOfInterestDetails: pointOfInterestDetailsReducer,
				pointsOfInterest: pointsOfInterestReducer,
				route: routeReducer,
				userRoute: userRouteReducer,
			},
		});
	}
}

export { Store };
