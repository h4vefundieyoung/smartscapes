import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type Coordinates } from "~/libs/types/types.js";

const getActualCoordinatesFromStorage = async (): Promise<Coordinates[]> => {
	const storedPathCoordinates = await storage.get(
		StorageKey.ACTUAL_PATH_COORDINATES,
	);

	return storedPathCoordinates
		? (JSON.parse(storedPathCoordinates) as Coordinates[])
		: [];
};

export { getActualCoordinatesFromStorage };
