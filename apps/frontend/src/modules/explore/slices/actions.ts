import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type Location,
	type PaginationMeta,
	type RouteFindAllOptions,
	type RouteGetAllItemResponseDto,
} from "~/libs/types/types.js";

import { routesApi } from "../../routes/routes.js";
import { name as sliceName } from "./explore.slice.js";

const ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

type RouteSearchParameters = {
	location?: Location;
	page?: number;
	searchTerm?: string;
};

const getRoutes = createAsyncThunk<
	{ data: RouteGetAllItemResponseDto[]; meta: PaginationMeta },
	RouteSearchParameters,
	{ rejectValue: string }
>(
	`${sliceName}/get-routes`,
	async (
		{ location, page = DEFAULT_PAGE, searchTerm = "" },
		{ rejectWithValue },
	) => {
		try {
			const query: RouteFindAllOptions = {
				page,
				perPage: ITEMS_PER_PAGE,
			};

			if (location) {
				query.latitude = location.latitude;
				query.longitude = location.longitude;
			}

			if (searchTerm) {
				query.name = searchTerm;
			}

			const response = await routesApi.getAll(query);

			return response;
		} catch {
			return rejectWithValue("Failed to fetch routes.");
		}
	},
);

const loadMoreRoutes = createAsyncThunk<
	{ data: RouteGetAllItemResponseDto[]; meta: PaginationMeta },
	{ location?: Location; page: number; searchTerm?: string },
	{ rejectValue: string }
>(
	`${sliceName}/load-more-routes`,
	async ({ location, page, searchTerm = "" }, { rejectWithValue }) => {
		try {
			const query: RouteFindAllOptions = {
				page,
				perPage: ITEMS_PER_PAGE,
			};

			if (location) {
				query.latitude = location.latitude;
				query.longitude = location.longitude;
			}

			if (searchTerm) {
				query.name = searchTerm;
			}

			const response = await routesApi.getAll(query);

			return response;
		} catch {
			return rejectWithValue("Failed to load more routes.");
		}
	},
);

export { getRoutes, loadMoreRoutes };
