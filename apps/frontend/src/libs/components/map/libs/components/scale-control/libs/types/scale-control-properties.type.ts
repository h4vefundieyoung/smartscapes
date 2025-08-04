import {
	type BaseControlProperties,
	type ScaleUnit,
} from "../../../../types/shared.type.js";

type ScaleControlProperties = BaseControlProperties & {
	enabled?: boolean;
	maxWidth?: number;
	unit?: ScaleUnit;
};

export { type ScaleControlProperties };
