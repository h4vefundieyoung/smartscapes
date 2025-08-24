import { getCssValue } from "~/libs/helpers/helpers.js";

const MAP_LAYER_STYLES = {
	ROUTE: {
		LINE_COLOR: getCssValue(document.body, "--color-route-line"),
		LINE_WIDTH: 6,
	},
	ROUTE_OUTLINE: {
		LINE_COLOR: getCssValue(document.body, "--color-brand-1000"),
		LINE_WIDTH: 12,
	},
};

export { MAP_LAYER_STYLES };
