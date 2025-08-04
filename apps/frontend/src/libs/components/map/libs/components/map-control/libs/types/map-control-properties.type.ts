import { type BaseControlProperties } from "../../../../types/shared.type.js";

type MapControlProperties = BaseControlProperties & {
	showZoom?: boolean;
	showCompass?: boolean;
};

export { type MapControlProperties };
