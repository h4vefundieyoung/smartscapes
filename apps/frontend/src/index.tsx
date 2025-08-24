import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
	App,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
	ToastContainer,
} from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { pwa } from "~/libs/modules/pwa/pwa.js";
import { store } from "~/libs/modules/store/store.js";
import { Auth } from "~/pages/auth/auth.jsx";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import { Dashboard } from "./pages/dashboard/dashboard.js";
import { Explore } from "./pages/explore/explore.js";
import { Landing } from "./pages/landing/landing.jsx";
import { ManageRoutes } from "./pages/manage-routes/manage-routes.js";
import { PointsOfInterestDetails } from "./pages/points-of-interest-details/points-of-interest-details.js";
import { Profile } from "./pages/profile/profile.js";
import { PublicProfile } from "./pages/public-profile/public-profile.js";
import { RouteDetails } from "./pages/route-description/route-details.js";

pwa.register();

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: <PointsOfInterestDetails />,
								path: AppRoute.POINTS_OF_INTEREST_$ID,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
							{
								element: (
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								),
								path: AppRoute.DASHBOARD,
							},
							{
								element: <RouteDetails />,
								path: AppRoute.ROUTES_$ID,
							},
							{
								element: <Explore />,
								path: AppRoute.EXPLORE,
							},
							{
								element: (
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								),
								path: AppRoute.PROFILE,
							},
							{
								element: (
									<ProtectedRoute>
										<PublicProfile />
									</ProtectedRoute>
								),
								path: AppRoute.USERS_$ID,
							},
							{
								element: (
									<ProtectedRoute
										routePermissions={[PermissionKey.MANAGE_ROUTES]}
									>
										<ManageRoutes />
									</ProtectedRoute>
								),
								path: AppRoute.MANAGE_ROUTES,
							},
						],
						element: <App />,
						path: AppRoute.APP,
					},
					{
						element: <Landing />,
						path: AppRoute.ROOT,
					},
					{
						element: <NotFound />,
						path: "*",
					},
				]}
			/>
			<ToastContainer />
		</StoreProvider>
	</StrictMode>,
);
