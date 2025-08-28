import React from "react";

import { MapProvider } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type Location } from "~/libs/types/types.js";
import {
	actions as exploreActions,
	getRoutes,
	loadMoreRoutes,
} from "~/modules/explore/explore.js";
import { actions as locationActions } from "~/modules/location/location.js";

import { RoutesPanel } from "./libs/components/components.js";
import { mockPOIs } from "./mock-pois.js";
import styles from "./styles.module.css";

const DEFAULT_PAGE_INCREMENT = 1;

const Explore = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const routesDataStatus = useAppSelector((state) => state.explore.dataStatus);
	const routesError = useAppSelector((state) => state.explore.error);
	const routes = useAppSelector((state) => state.explore.routes);
	const hasMore = useAppSelector((state) => state.explore.hasMore);
	const isLoadingMore = useAppSelector((state) => state.explore.isLoadingMore);
	const loadMoreFailed = useAppSelector(
		(state) => state.explore.loadMoreFailed,
	);
	const page = useAppSelector((state) => state.explore.page);
	const searchTerm = useAppSelector((state) => state.explore.searchTerm);
	const locationDataStatus = useAppSelector(
		(state) => state.location.dataStatus,
	);
	const location = useAppSelector((state) => state.location.location);

	const handleLoadMore = useCallback(() => {
		const nextPage = page + DEFAULT_PAGE_INCREMENT;
		const loadMoreParameters: {
			location?: Location;
			page: number;
			searchTerm?: string;
		} = {
			page: nextPage,
		};

		if (location) {
			loadMoreParameters.location = location;
		}

		if (searchTerm) {
			loadMoreParameters.searchTerm = searchTerm;
		}

		void dispatch(loadMoreRoutes(loadMoreParameters));
	}, [dispatch, page, location, searchTerm]);

	const handleSearch = useCallback(
		(searchTerm: string) => {
			dispatch(exploreActions.setSearchTerm(searchTerm));
			const searchParameters: { location?: Location; searchTerm?: string } = {};

			if (location) {
				searchParameters.location = location;
			}

			if (searchTerm) {
				searchParameters.searchTerm = searchTerm;
			}

			void dispatch(getRoutes(searchParameters));
		},
		[dispatch, location],
	);

	useEffect(() => {
		void dispatch(locationActions.getCurrentUserLocation());
	}, [dispatch]);

	useEffect(() => {
		if (locationDataStatus === DataStatus.REJECTED) {
			void dispatch(getRoutes({}));
		}

		if (locationDataStatus === DataStatus.FULFILLED && location !== null) {
			void dispatch(
				getRoutes({
					location: {
						latitude: location.latitude,
						longitude: location.longitude,
					},
				}),
			);
		}
	}, [locationDataStatus, location, dispatch]);

	return (
		<main className={styles["main"]}>
			<div className={styles["container"]}>
				<MapProvider markers={mockPOIs}>
					<RoutesPanel
						hasMore={hasMore}
						isLoadingMore={isLoadingMore}
						loadMoreFailed={loadMoreFailed}
						locationDataStatus={locationDataStatus}
						onLoadMore={handleLoadMore}
						onSearch={handleSearch}
						routes={routes}
						routesDataStatus={routesDataStatus}
						routesError={routesError}
					/>
				</MapProvider>
			</div>
		</main>
	);
};

export { Explore };
