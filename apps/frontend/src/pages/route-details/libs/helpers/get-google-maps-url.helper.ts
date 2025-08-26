import { configureString } from "~/libs/helpers/helpers.js";

const getGoogleMapsUrl = (lat: number, lng: number): string =>
	configureString("https://www.google.com/maps?q=:lat,:lng", {
		lat: lat.toString(),
		lng: lng.toString(),
	});

export { getGoogleMapsUrl };
