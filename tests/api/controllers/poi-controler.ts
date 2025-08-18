import { type APIRequestContext, type APIResponse } from "@playwright/test";
import { type PointsOfInterestRequestDto } from "@smartscapes/shared";
import { APIPath } from "consts/api-path.js";

class POIController {
	public constructor(private request: APIRequestContext) {}

	public async createPoi(
		poiRequestDto: PointsOfInterestRequestDto,
		accessToken: string,
	): Promise<APIResponse> {
		return await this.request.post(APIPath.POI, {
			data: poiRequestDto,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	public async deletePoi(
		id: number,
		accessToken: string,
	): Promise<APIResponse> {
		return await this.request.delete(`${APIPath.POI}/${String(id)}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	public async getAllPois(
		accessToken: string,
		filters?: {
			latitude?: string;
			longitude?: string;
			name?: string;
			radius?: string;
		},
	): Promise<APIResponse> {
		const query = filters
			? "?" + new URLSearchParams(filters as Record<string, string>).toString()
			: "";

		return await this.request.get(`${APIPath.POI}${query}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	public async getPoiById(
		id: number,
		accessToken: string,
	): Promise<APIResponse> {
		return await this.request.get(`${APIPath.POI}/${String(id)}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	public async updatePoi(
		id: number,
		poiRequestDto: PointsOfInterestRequestDto,
		accessToken: string,
	): Promise<APIResponse> {
		return await this.request.patch(`${APIPath.POI}/${String(id)}`, {
			data: poiRequestDto,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}
}

export { POIController };
