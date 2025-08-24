import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	type RouteCreateRequestDto,
	type RouteGetByIdResponseDto,
} from "./../libs/types/types.js";
import {
	create,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	patchRoute,
	restoreCreateRouteFormData,
	saveUserRoute,
} from "./actions.js";

type State = {
	createStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	formData: null | Partial<RouteCreateRequestDto>;
	formDataStatus: ValueOf<typeof DataStatus>;
	route: null | RouteGetByIdResponseDto;
	routes: RouteGetByIdResponseDto[];
	saveRouteStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	createStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	formData: null,
	formDataStatus: DataStatus.IDLE,
	route: null,
	routes: [],
	saveRouteStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.routes.push(action.payload.data);
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});

		builder.addCase(getRouteById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getRouteById.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getRouteById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(patchRoute.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(patchRoute.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patchRoute.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(restoreCreateRouteFormData.pending, (state) => {
			state.formDataStatus = DataStatus.PENDING;
		});
		builder.addCase(restoreCreateRouteFormData.fulfilled, (state, action) => {
			state.formData = action.payload;
			state.formDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(restoreCreateRouteFormData.rejected, (state) => {
			state.formDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(discardCreateRouteFormData.fulfilled, (state) => {
			state.formData = null;
		});
		builder.addCase(saveUserRoute.pending, (state) => {
			state.saveRouteStatus = DataStatus.PENDING;
		});
		builder.addCase(saveUserRoute.rejected, (state) => {
			state.saveRouteStatus = DataStatus.REJECTED;
		});
		builder.addCase(
			saveUserRoute.fulfilled,
			(state, { payload: { id, status } }) => {
				state.saveRouteStatus = DataStatus.FULFILLED;

				if (state.route) {
					state.route.userRoute = { id, status };
				}
			},
		);
	},
	initialState,
	name: "routes",
	reducers: {},
});

export { actions, name, reducer };
