import { config } from "~/libs/modules/config/config.js";

import { PWA } from "./pwa.module.js";

const pwa = new PWA(config);

export { pwa };
