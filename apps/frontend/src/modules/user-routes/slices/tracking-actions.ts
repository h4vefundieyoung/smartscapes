import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import { type Coordinates } from "~/libs/types/types.js";

import { TRACKING_CONFIG } from "../libs/constants/constants.js";
import { TrackingExeptionMessage } from "../libs/enums/enums.js";
import {
	actions,
	name as detailsSliceName,
} from "./user-route-details.slice.js";

const addPointToActualPath = createAsyncThunk<
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
			const storedPathCoordinates = (await storage.get(
				StorageKey.ACTUAL_PATH_COORDINATES,
			)) as string;

			const parsedStoredPathCoordinates = storedPathCoordinates
				? (JSON.parse(storedPathCoordinates) as Coordinates[])
				: [];

			if (parsedStoredPathCoordinates.length > 0) {
				dispatch(actions.setRestoredActualPath(parsedStoredPathCoordinates));
			}

			// eslint-disable-next-line sonarjs/no-intrusive-permissions
			const watchId = navigator.geolocation.watchPosition(
				(position) => {
					const coordinates: Coordinates = [
						position.coords.longitude,
						position.coords.latitude,
					];

					void dispatch(addPointToActualPath(coordinates));
				},
				(error) => {
					if (error instanceof GeolocationPositionError) {
						return rejectWithValue(error.message);
					}

					return rejectWithValue(
						TrackingExeptionMessage.FAILED_TO_TRACK_LOCATION,
					);
				},
				TRACKING_CONFIG,
			);

			await storage.set(StorageKey.TRACKING_WATCH_ID, watchId.toString());
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
	async (_, { extra, rejectWithValue }) => {
		const { storage } = extra;

		try {
			const watchId = await storage.get(StorageKey.TRACKING_WATCH_ID);

			if (watchId) {
				navigator.geolocation.clearWatch(Number(watchId));

				await storage.drop(StorageKey.TRACKING_WATCH_ID);
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
