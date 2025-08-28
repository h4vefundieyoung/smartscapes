import {
	type Coordinates,
	type LineStringGeometry,
} from "../../../../libs/types/types.js";
import { type FileUploadResponseDto } from "../../../files/libs/types/types.js";

type RouteGetByIdResponseDto = {
	createdByUserId: number;
	description: string;
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	images: (Pick<FileUploadResponseDto, "id" | "url"> & {
		createdAt: string;
	})[];
	name: string;
	pois: {
		id: number;
		location: {
			coordinates: Coordinates;
			type: string;
		};
		name: string;
		visitOrder: number;
	}[];
};

export { type RouteGetByIdResponseDto };
