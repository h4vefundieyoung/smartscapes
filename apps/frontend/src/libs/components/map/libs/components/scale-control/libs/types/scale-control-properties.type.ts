import {
	type BaseControlProperties,
	type ScaleUnit,
} from "../../../../types/shared.type.js";

type ScaleControlProperties = BaseControlProperties & {
	enabled?: boolean;
	unit?: ScaleUnit;
	maxWidth?: number;
};

export { type ScaleControlProperties };
