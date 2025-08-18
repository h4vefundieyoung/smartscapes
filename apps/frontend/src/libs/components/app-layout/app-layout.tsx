import { type JSX, type PropsWithChildren } from "react";

import { Header } from "~/libs/components/header/header.js";
import { Sidebar } from "~/libs/components/sidebar/sidebar.js";
import { NAVIGATION_ITEMS_GROUPS } from "~/libs/constants/constants.js";
import {
	combineClassNames,
	getPermittedNavigationItems,
} from "~/libs/helpers/helpers.js";
import { useAppSelector, useLocation, useMemo } from "~/libs/hooks/hooks.js";

import { UNAUTHORIZED_HEADER_ACTIONS } from "./libs/constants/constants.js";
import { checkPathEndsWithRoute } from "./libs/helpers/helpers.js";
import { type RouteList } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = PropsWithChildren & {
	excludedRoutes: RouteList;
};

const AppLayout = ({ children, excludedRoutes }: Properties): JSX.Element => {
	const { pathname } = useLocation();
	const user = useAppSelector(({ auth }) => auth.authenticatedUser);
	const hasSidebar = Boolean(user);
	const isRouteExcluded = checkPathEndsWithRoute(excludedRoutes, pathname);
	const headerActions = user ? [] : UNAUTHORIZED_HEADER_ACTIONS;

	const permittedNavigationItems = useMemo(() => {
		return getPermittedNavigationItems(
			Boolean(user),
			NAVIGATION_ITEMS_GROUPS,
			user?.group.permissions ?? [],
		);
	}, [user]);

	return (
		<div
			className={combineClassNames(
				styles["container"],
				hasSidebar && styles["sidebar-space"],
			)}
		>
			{!isRouteExcluded && (
				<>
					<Header actions={headerActions} user={user} />
					{hasSidebar && (
						<Sidebar navigationItemsGroups={permittedNavigationItems} />
					)}
				</>
			)}
			{children}
		</div>
	);
};

export { AppLayout };
