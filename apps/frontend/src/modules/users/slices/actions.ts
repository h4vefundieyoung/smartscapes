import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type UserFollowsRequestDto,
	type UserPublicProfileResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./users.slice.js";

const getUserPublicProfile = createAsyncThunk<
	APIResponse<UserPublicProfileResponseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-user-public-profile`, (id, { extra }) => {
	const { userApi } = extra;

	return userApi.getProfile(id);
});

const followUser = createAsyncThunk<
	APIResponse<null>,
	{ payload: UserFollowsRequestDto; userId: number },
	AsyncThunkConfig
>(`${sliceName}/follow-user`, ({ payload, userId }, { extra }) => {
	const { userApi } = extra;

	return userApi.follow(userId, payload);
});

const unfollowUser = createAsyncThunk<
	APIResponse<null>,
	{ followerId: number; userId: number },
	AsyncThunkConfig
>(`${sliceName}/unfollow-user`, ({ followerId, userId }, { extra }) => {
	const { userApi } = extra;

	return userApi.unfollow(userId, followerId);
});

export { followUser, getUserPublicProfile, unfollowUser };
