import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { FileApi } from "./files-api.js";

const fileApi = new FileApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { fileApi };
