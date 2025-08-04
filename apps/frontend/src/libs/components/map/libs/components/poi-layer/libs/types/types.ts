import { type BaseControlProperties } from "../../../../types/shared.type.js";

type PoiLayerProperties = BaseControlProperties & {
	onPoiClick?: ((poi: PointOfInterest) => void) | undefined;
	poisData?: PointOfInterest[];
};

type PointOfInterest = {
	id: number;
	location: {
		coordinates: [number, number];
		type: "Point";
	};
	name: string;
};

export { type PoiLayerProperties, type PointOfInterest };
