import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type APIResponse,
	type AsyncThunkConfig,
	type PaginationMeta,
} from "~/libs/types/types.js";

import {
	type CategoryGetAllItemResponseDto,
	type PaginationQuery,
} from "../libs/types/types.js";
import { name as sliceName } from "./categories.slice.js";

const getAll = createAsyncThunk<
	APIResponse<CategoryGetAllItemResponseDto[], PaginationMeta>,
	PaginationQuery,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (payload, { extra }) => {
	const { categoriesApi } = extra;

	const { data, meta } = await categoriesApi.getAll(payload);

	return { data, meta };
});

export { getAll };
