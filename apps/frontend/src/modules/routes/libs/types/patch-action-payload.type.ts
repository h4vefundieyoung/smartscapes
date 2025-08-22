import { type RoutePatchRequestDto } from "~/modules/routes/routes.js";

type PatchActionPayload = {
	id: number;
	payload: RoutePatchRequestDto;
};

export { type PatchActionPayload };
