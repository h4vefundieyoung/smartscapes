import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import { type NotificationGetAllItemResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./notification.slice.js";

const getNotifications = createAsyncThunk<
	APIResponse<{ items: NotificationGetAllItemResponseDto[] }>,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-notifications`, async (_, { extra }) => {
	const { notificationApi } = extra;

	return await notificationApi.getNotifications();
});

export { getNotifications };
