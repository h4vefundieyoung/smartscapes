import { type ValueOf } from "../../../../types/types.js";
import { type HTTPMethodEnum } from "../enums/enums.js";

type HTTPMethod = ValueOf<typeof HTTPMethodEnum>;

export { type HTTPMethod };
