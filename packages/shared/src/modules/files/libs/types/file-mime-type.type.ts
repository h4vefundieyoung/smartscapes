import { type ValueOf } from "../../../../libs/types/types.js";
import { type FileMime } from "../enums/file-mime.enum.js";

type FileMimeType = ValueOf<typeof FileMime>;

export { type FileMimeType };
