import { type ValueOf } from "../../../libs/types/types.js";
import { type GroupKey } from "../groups.js";

type GroupResponseDto = {
	id: ValueOf<typeof GroupKey>;
	key: string;
	name: string;
};

export { type GroupResponseDto };
