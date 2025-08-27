import {
	type LineStringGeometry,
	type PointGeometry,
} from "../../../../libs/types/types.js";
import { type CategoryGetAllItemResponseDto } from "../../../categories/libs/types/types.js";
import { type FileUploadResponseDto } from "../../../files/libs/types/types.js";
import { type UserRouteResponseDto } from "../../../user-routes/user-routes.js";

type RouteGetByIdResponseDto = {
	categories: CategoryGetAllItemResponseDto[];
	createdAt: string;
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
		location: PointGeometry;
		name: string;
		visitOrder: number;
	}[];
	savedUserRoute: null | Pick<UserRouteResponseDto, "id" | "status">;
};

export { type RouteGetByIdResponseDto };
