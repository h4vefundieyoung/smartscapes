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
import {
	categoriesApi,
	reducer as categoriesReducer,
} from "~/modules/categories/categories.js";
import { reducer as exploreReducer } from "~/modules/explore/explore.js";
import { reducer as locationReducer } from "~/modules/location/location.js";
import {
	notificationApi,
	reducer as notificationReducer,
} from "~/modules/notification/notification.js";
import {
	pointOfInterestApi,
	pointOfInterestDetailsReducer,
	pointsOfInterestReducer,
} from "~/modules/points-of-interest/points-of-interest.js";
import { reviewApi } from "~/modules/reviews/reviews.js";
import {
	constructRouteReducer,
	routeDetailsReducer,
	routesApi,
	routesReducer,
} from "~/modules/routes/routes.js";
import {
	userRoutesApi,
	userRoutesDetailsReducer,
	userRoutesReducer,
} from "~/modules/user-routes/user-routes.js";
import { userApi, reducer as usersReducer } from "~/modules/users/users.js";

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
			categoriesApi,
			notificationApi,
			pointOfInterestApi,
			reviewApi,
			routesApi,
			storage,
			toastNotifier,
			userApi,
			userRoutesApi,
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
				categories: categoriesReducer,
				constructRoute: constructRouteReducer,
				explore: exploreReducer,
				location: locationReducer,
				notification: notificationReducer,
				pointOfInterestDetails: pointOfInterestDetailsReducer,
				pointsOfInterest: pointsOfInterestReducer,
				routeDetails: routeDetailsReducer,
				routes: routesReducer,
				userRoutes: userRoutesReducer,
				userRoutesDetails: userRoutesDetailsReducer,
				users: usersReducer,
			},
		});
	}
}

export { Store };
