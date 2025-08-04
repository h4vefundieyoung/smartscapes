import { config } from "../config/config.js";
import { http } from "../http/http.js";
import { MapBoxDirectionsApi } from "./map-box-directions-api.js";

const mapBoxDirectionsApi = new MapBoxDirectionsApi({ config, http });

export { mapBoxDirectionsApi };
export { type MapBoxDirectionsApi } from "./map-box-directions-api.js";
