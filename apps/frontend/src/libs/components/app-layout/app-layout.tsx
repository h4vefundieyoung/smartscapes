import { type JSX, type PropsWithChildren } from "react";

import { Header } from "~/libs/components/header/header.js";
import { Sidebar } from "~/libs/components/sidebar/sidebar.js";
import { NAVIGATION_ITEMS_GROUPS } from "~/libs/constants/constants.js";
import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";

import { UNAUTHORIZED_HEADER_ACTIONS } from "./libs/constants/constants.js";
import { checkPathEndsWithRoute } from "./libs/helpers/helpers.js";
import { type RouteList } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = PropsWithChildren & {
	excludedRoutes: RouteList;
	unauthorizedRoutes: RouteList;
};

const AppLayout = ({
	children,
	excludedRoutes,
	unauthorizedRoutes,
}: Properties): JSX.Element => {
	const { pathname } = useLocation();
	const user = useAppSelector(({ auth }) => auth.authenticatedUser);
	const hasSidebar = Boolean(user);
	const isUnauthorizedRoute = checkPathEndsWithRoute(
		unauthorizedRoutes,
		pathname,
	);
	const isRouteExcluded = !checkPathEndsWithRoute(excludedRoutes, pathname);
	const headerActions =
		isUnauthorizedRoute && Boolean(user) ? UNAUTHORIZED_HEADER_ACTIONS : [];

	return (
		<div
			className={combineClassNames(
				styles["container"],
				hasSidebar && styles["sidebar-space"],
			)}
		>
			{isRouteExcluded && (
				<>
					<Header actions={headerActions} user={user} />
					{hasSidebar && (
						<Sidebar navigationItemsGroups={NAVIGATION_ITEMS_GROUPS} />
					)}
				</>
			)}
			{children}
		</div>
	);
};

export { AppLayout };
