import { createAsyncThunk } from "@reduxjs/toolkit";

import { type Coordinates } from "../libs/types/types.js";
import { name as sliceName } from "./location.slice.js";

const getCurrentUserLocation = createAsyncThunk<
	Coordinates,
	undefined,
	{ rejectValue: string }
>(`${sliceName}/get-user-location`, async (_, { rejectWithValue }) => {
	try {
		const position = await new Promise<GeolocationPosition>(
			(resolve, reject) => {
				// eslint-disable-next-line sonarjs/no-intrusive-permissions
				navigator.geolocation.getCurrentPosition(resolve, reject);
			},
		);

		return {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		};
	} catch (error) {
		if (error instanceof GeolocationPositionError) {
			return rejectWithValue(error.message);
		}

		return rejectWithValue("Failed to get your location.");
	}
});

export { getCurrentUserLocation };
