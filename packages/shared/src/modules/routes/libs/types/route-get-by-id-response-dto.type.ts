import { type LineStringGeometry } from "../../../../libs/types/types.js";
import { type FileUploadResponseDto } from "../../../files/libs/types/types.js";
import { type UserRouteResponseDto } from "../../../user-routes/user-routes.js";

type RouteGetByIdResponseDto = {
	createdByUserId: number;
	description: null | string;
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	images: Pick<FileUploadResponseDto, "id" | "url">[];
	name: string;
	pois: {
		id: number;
		name: string;
		visitOrder: number;
	}[];
	savedUserRoute: null | Pick<UserRouteResponseDto, "id" | "status">;
};

export { type RouteGetByIdResponseDto };
