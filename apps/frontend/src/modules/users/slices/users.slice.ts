import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	type UserPublicProfileResponseDto,
	type UserRouteResponseDto,
} from "../libs/types/types.js";
import {
	followUser,
	getActivities,
	getUserPublicProfile,
	unfollowUser,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	followingStatus: ValueOf<typeof DataStatus>;
	userActivities: UserRouteResponseDto[];
	userProfile: null | UserPublicProfileResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	followingStatus: DataStatus.IDLE,
	userActivities: [],
	userProfile: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getUserPublicProfile.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getUserPublicProfile.fulfilled, (state, action) => {
			state.userProfile = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getUserPublicProfile.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.userProfile = null;
		});

		builder.addCase(followUser.pending, (state) => {
			state.followingStatus = DataStatus.PENDING;
		});
		builder.addCase(followUser.fulfilled, (state) => {
			if (state.userProfile) {
				state.userProfile.followersCount += 1;
				state.userProfile.isFollowed = true;
			}

			state.followingStatus = DataStatus.FULFILLED;
		});
		builder.addCase(followUser.rejected, (state) => {
			state.followingStatus = DataStatus.REJECTED;
		});

		builder.addCase(unfollowUser.pending, (state) => {
			state.followingStatus = DataStatus.PENDING;
		});
		builder.addCase(unfollowUser.fulfilled, (state) => {
			if (state.userProfile) {
				state.userProfile.followersCount -= 1;
				state.userProfile.isFollowed = false;
			}

			state.followingStatus = DataStatus.FULFILLED;
		});
		builder.addCase(unfollowUser.rejected, (state) => {
			state.followingStatus = DataStatus.REJECTED;
		});
		builder.addCase(getActivities.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getActivities.fulfilled, (state, action) => {
			state.userActivities = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getActivities.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.userActivities = [];
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
