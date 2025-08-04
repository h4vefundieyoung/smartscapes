import { type BaseControlProperties } from "../../../../types/shared.type.js";

type MapControlProperties = BaseControlProperties & {
	showCompass?: boolean;
	showZoom?: boolean;
};

export { type MapControlProperties };
