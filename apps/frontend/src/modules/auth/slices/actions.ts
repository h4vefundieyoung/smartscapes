import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type UserAuthResponseDto,
	type UserSignUpRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./auth.slice.js";

const getAuthenticatedUser = createAsyncThunk<
	null | UserAuthResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/authenticated-user`, async (_payload, { extra }) => {
	const { authApi, storage } = extra;

	const hasToken = await storage.has(StorageKey.TOKEN);

	if (!hasToken) {
		return null;
	}

	const { data } = await authApi.getAuthenticatedUser();

	return data;
});

const signUp = createAsyncThunk<
	UserAuthResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (payload, { extra }) => {
	const { authApi, storage } = extra;

	const {
		data: { token, user },
	} = await authApi.signUp(payload);
	await storage.set(StorageKey.TOKEN, token);

	return user;
});

export { getAuthenticatedUser, signUp };
