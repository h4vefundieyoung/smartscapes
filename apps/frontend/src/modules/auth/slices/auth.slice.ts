import { createSlice } from "@reduxjs/toolkit";
import { type UserSignUpResponseDto } from "@smartscapes/shared";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { signUp } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	error: null | string;
	isAuthenticated: boolean;
	user: null | UserSignUpResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	isAuthenticated: false,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.error = null;
			state.isAuthenticated = true;
			state.user = action.payload;
		});
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
		});
		builder.addCase(signUp.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.error = (action.payload as string) || "An unknown error occurred";
			state.isAuthenticated = false;
			state.user = null;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
