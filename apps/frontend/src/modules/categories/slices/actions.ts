import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import { type CategoryGetAllItemResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./categories.slice.js";

const getAll = createAsyncThunk<
	APIResponse<CategoryGetAllItemResponseDto[]>,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (_, { extra }) => {
	const { categoriesApi } = extra;

	const response = await categoriesApi.getAll();

	return response;
});

export { getAll };
