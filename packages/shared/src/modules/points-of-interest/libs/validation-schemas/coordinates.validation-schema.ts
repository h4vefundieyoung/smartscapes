import { z } from "zod";

import {
	latitudeSchema,
	longitudeSchema,
} from "./longitude-latitude.validation-schema.js";

const coordinatesSchema = z.tuple([longitudeSchema, latitudeSchema]);

export { coordinatesSchema };
