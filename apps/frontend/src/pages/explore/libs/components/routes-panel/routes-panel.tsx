import React from "react";

import {
	Button,
	Input,
	Loader,
	RouteCard,
	RouteMapPopup,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppForm,
	useCallback,
	useDebouncedFunction,
	useEffect,
	useInfiniteScroll,
	useMapClient,
	useMemo,
	useRef,
	useWatch,
} from "~/libs/hooks/hooks.js";
import { type MapMarker } from "~/libs/modules/map-client/libs/types/types.js";
import {
	type RouteFindAllOptions,
	type RouteGetAllItemResponseDto,
	type ValueOf,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	hasMore: boolean;
	loadMoreDataStatus: ValueOf<typeof DataStatus>;
	locationDataStatus: ValueOf<typeof DataStatus>;
	onLoadMore: (searchTerm?: string) => void;
	onSearch: (searchTerm: string) => void;
	routes: RouteGetAllItemResponseDto[];
	routesDataStatus: ValueOf<typeof DataStatus>;
	routesError: null | string;
};

const RoutesPanel = ({
	hasMore,
	loadMoreDataStatus,
	locationDataStatus,
	onLoadMore,
	onSearch,
	routes,
	routesDataStatus,
	routesError,
}: Properties): React.JSX.Element => {
	const hasLocationError = locationDataStatus === DataStatus.REJECTED;
	const isRoutesLoading = routesDataStatus === DataStatus.PENDING;
	const isLoadingMore = loadMoreDataStatus === DataStatus.PENDING;
	const loadMoreFailed = loadMoreDataStatus === DataStatus.REJECTED;

	const mapClient = useMapClient();
	const currentMarkerReference = useRef<MapMarker | null>(null);

	const clearCurrentMarker = useCallback((): void => {
		if (currentMarkerReference.current) {
			currentMarkerReference.current.remove();
			currentMarkerReference.current = null;
		}
	}, []);

	useEffect(() => {
		return (): void => {
			clearCurrentMarker();
		};
	}, [clearCurrentMarker]);

	const createMarkerWithPopup = useCallback(
		(
			coordinates: [number, number],
			route: RouteGetAllItemResponseDto,
		): void => {
			const newMarker = mapClient.addMarker({ coordinates });

			if (newMarker) {
				newMarker.addPopup(<RouteMapPopup route={route} />);
				currentMarkerReference.current = newMarker;
			} else {
				currentMarkerReference.current = null;
			}
		},
		[mapClient],
	);

	const navigateToRoute = useCallback(
		(route: RouteGetAllItemResponseDto): void => {
			const [longitude, latitude] = route.geometry.coordinates[0] ?? [];

			if (!longitude || !latitude) {
				return;
			}

			clearCurrentMarker();
			mapClient.flyTo([longitude, latitude]);
			createMarkerWithPopup([longitude, latitude], route);
		},
		[mapClient, clearCurrentMarker, createMarkerWithPopup],
	);

	const handleRouteCardClick = useCallback(
		(routeId: number) => (): void => {
			const route = routes.find((route) => route.id === routeId);

			if (!route?.geometry.coordinates.length) {
				return;
			}

			navigateToRoute(route);
		},
		[routes, navigateToRoute],
	);

	const { control, errors } = useAppForm<RouteFindAllOptions>({
		defaultValues: {
			name: "",
		},
		mode: "onChange",
	});

	const searchValue = useWatch({ control, name: "name" });
	const isFirstRender = useRef(true);

	const searchFunction = useCallback(
		(searchTerm: string) => {
			onSearch(searchTerm);
		},
		[onSearch],
	);

	const debouncedSearch = useDebouncedFunction(searchFunction);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;

			return;
		}

		debouncedSearch(searchValue || "");
	}, [searchValue, debouncedSearch]);

	const { elementReference } = useInfiniteScroll({
		hasNextPage: hasMore,
		isLoading: isLoadingMore,
		onLoadMore,
		threshold: 0.1,
	});

	const handleRetrySearch = useCallback(() => {
		onSearch(searchValue || "");
	}, [onSearch, searchValue]);

	const handleLoadMoreClick = useCallback(() => {
		onLoadMore(searchValue || "");
	}, [onLoadMore, searchValue]);

	const content = useMemo(() => {
		if (isRoutesLoading && routes.length === 0) {
			return (
				<div className={styles["loader-container"]}>
					<Loader />
				</div>
			);
		}

		if (routes.length === 0 && !isRoutesLoading) {
			if (routesError) {
				return (
					<div className={styles["error-container"]}>
						<span className={styles["error"]}>{routesError}</span>
						<Button
							label="Try Again"
							onClick={handleRetrySearch}
							type="button"
							variant="primary"
						/>
					</div>
				);
			}

			return (
				<div className={styles["list-empty"]}>
					{searchValue
						? "No routes found matching your search."
						: "No routes found nearby."}
				</div>
			);
		}

		return (
			<>
				{hasLocationError && (
					<div className={styles["warning"]}>
						Please enable geolocation to see routes near you.
					</div>
				)}

				{routesError && (
					<div className={styles["error-container"]}>
						<span className={styles["error"]}>{routesError}</span>
						<Button
							label="Try Again"
							onClick={handleRetrySearch}
							type="button"
							variant="primary"
						/>
					</div>
				)}

				<ul className={styles["list"]}>
					{routes.map(({ geometry, id, images, name, pois }) => (
						<RouteCard
							id={id}
							imageUrl={images.at(0)?.url ?? null}
							key={`${String(id)}-${name}`}
							mapProps={{
								markers: pois.map((poi) => ({
									coordinates: poi.location.coordinates,
								})),
								routeLine: { geometry, id: String(id) },
							}}
							name={name}
							onClick={handleRouteCardClick(id)}
						/>
					))}
					{hasMore && (
						<li className={styles["load-more-trigger"]} ref={elementReference}>
							{isLoadingMore && (
								<div className={styles["loader-container"]}>
									<Loader />
								</div>
							)}
						</li>
					)}
				</ul>
			</>
		);
	}, [
		hasLocationError,
		handleRetrySearch,
		isRoutesLoading,
		routes,
		routesError,
		searchValue,
		handleRouteCardClick,
		hasMore,
		isLoadingMore,
		elementReference,
	]);

	return (
		<div className={styles["container"]}>
			<div className={styles["sticky-header"]}>
				<h3 className={styles["title"]}>Explore routes</h3>

				<div className={styles["search-container"]}>
					<Input
						control={control}
						errors={errors}
						iconLeft={{
							label: "Search",
							name: "search",
							onClick: undefined,
						}}
						isLabelHidden
						label="Search routes"
						name="name"
						type="text"
					/>
				</div>
			</div>

			{content}

			{routes.length > 0 && (
				<>
					{loadMoreFailed && (
						<div className={styles["load-more-button-container"]}>
							<Button
								label="Load More"
								onClick={handleLoadMoreClick}
								type="button"
								variant="outlined"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export { RoutesPanel };
