import { NAVIGATION_CONTROL_PARAMETERS } from "../consts/consts.js";
import { type MapboxGL, type NavigationControl } from "../types/types.js";

const createNavigationControl = (mapClient: MapboxGL): NavigationControl => {
	return new mapClient.NavigationControl({
		showCompass: NAVIGATION_CONTROL_PARAMETERS.SHOW_COMPASS,
		showZoom: NAVIGATION_CONTROL_PARAMETERS.SHOW_ZOOM,
		visualizePitch: NAVIGATION_CONTROL_PARAMETERS.VISUALIZE_PITCH,
	});
};

export { createNavigationControl };
