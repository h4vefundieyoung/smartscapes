import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import { type Coordinates } from "~/libs/types/types.js";

import { LOCATION_TRACKING_CONFIG } from "../libs/constants/constants.js";
import { TrackingExeptionMessage } from "../libs/enums/enums.js";
import {
	actions,
	name as detailsSliceName,
} from "./user-route-details.slice.js";

const addPointToActualStoragePath = createAsyncThunk<
	undefined,
	Coordinates,
	AsyncThunkConfig
>(
	`${detailsSliceName}/add-point-to-actual-path`,
	async (point, { extra, rejectWithValue }) => {
		const { storage } = extra;

		try {
			const currentPath = (await storage.get(
				StorageKey.ACTUAL_PATH_COORDINATES,
			)) as string;

			const parsedCurrentPath = currentPath
				? (JSON.parse(currentPath) as Coordinates[])
				: [];

			const updatedPath = [...parsedCurrentPath, point];

			await storage.set(
				StorageKey.ACTUAL_PATH_COORDINATES,
				JSON.stringify(updatedPath),
			);
		} catch {
			return rejectWithValue(
				TrackingExeptionMessage.FAILED_TO_SAVE_ROUTE_PROGRESS,
			);
		}
	},
);

const startTrackingRoute = createAsyncThunk<
	undefined,
	undefined,
	AsyncThunkConfig
>(
	`${detailsSliceName}/start-tracking-path`,
	async (_, { dispatch, extra, rejectWithValue }) => {
		const { storage } = extra;

		try {
			const storedPathCoordinates = await storage.get<string>(
				StorageKey.ACTUAL_PATH_COORDINATES,
			);

			const parsedStoredPathCoordinates = storedPathCoordinates
				? (JSON.parse(storedPathCoordinates) as Coordinates[])
				: [];

			if (parsedStoredPathCoordinates.length > 0) {
				dispatch(
					actions.setRestoredActualStorePath(parsedStoredPathCoordinates),
				);
			}

			// eslint-disable-next-line sonarjs/no-intrusive-permissions
			const watchId = navigator.geolocation.watchPosition(
				(position) => {
					const coordinates: Coordinates = [
						position.coords.longitude,
						position.coords.latitude,
					];

					void dispatch(addPointToActualStoragePath(coordinates));
					dispatch(actions.addPointToActualStorePath(coordinates));
				},
				(error) => {
					if (error instanceof GeolocationPositionError) {
						return rejectWithValue(error.message);
					}

					return rejectWithValue(
						TrackingExeptionMessage.FAILED_TO_TRACK_LOCATION,
					);
				},
				LOCATION_TRACKING_CONFIG,
			);

			dispatch(actions.setWatchId(watchId));
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}

			return rejectWithValue(TrackingExeptionMessage.FAILED_TO_START_TRACKING);
		}
	},
);

const stopTrackingRoute = createAsyncThunk<
	undefined,
	undefined,
	AsyncThunkConfig
>(
	`${detailsSliceName}/stop-tracking-path`,
	async (_, { extra, getState, rejectWithValue }) => {
		const { storage } = extra;

		try {
			const state = getState();
			const { watchId } = state.userRouteDetails;

			if (watchId) {
				navigator.geolocation.clearWatch(watchId);

				await storage.drop(StorageKey.ACTUAL_PATH_COORDINATES);
			}
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}

			return rejectWithValue(TrackingExeptionMessage.FAILED_TO_STOP_TRACKING);
		}
	},
);

export { startTrackingRoute, stopTrackingRoute };
