import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type APIResponse,
	type AsyncThunkConfig,
	type PaginationMeta,
} from "~/libs/types/types.js";

import {
	type CategoryCreateRequestDto,
	type CategoryGetAllItemResponseDto,
	type CategoryGetAllQuery,
} from "../libs/types/types.js";
import { name as sliceName } from "./categories.slice.js";

const create = createAsyncThunk<
	APIResponse<CategoryGetAllItemResponseDto>,
	CategoryCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { categoriesApi, toastNotifier } = extra;

	const category = await categoriesApi.create(payload);
	toastNotifier.showSuccess("Category created successfully");

	return category;
});

const getAll = createAsyncThunk<
	APIResponse<CategoryGetAllItemResponseDto[], PaginationMeta>,
	CategoryGetAllQuery,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (payload, { extra }) => {
	const { categoriesApi } = extra;

	const { data, meta } = await categoriesApi.getAll(payload);

	return { data, meta };
});

export { create, getAll };
