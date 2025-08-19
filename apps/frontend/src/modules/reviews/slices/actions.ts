import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
	type ReviewSearchQuery,
} from "../reviews.js";
import { name as sliceName } from "./review.slice.js";

const getAll = createAsyncThunk<
	APIResponse<ReviewGetByIdResponseDto[]>,
	ReviewSearchQuery | undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (options, { extra }) => {
	const { reviewApi } = extra;

	return await reviewApi.getAll(options);
});

const create = createAsyncThunk<
	APIResponse<ReviewGetByIdResponseDto>,
	ReviewRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { reviewApi, toastNotifier } = extra;

	const review = await reviewApi.create(payload);
	toastNotifier.showSuccess("Review created successfully.");

	return review;
});

export { create, getAll };
