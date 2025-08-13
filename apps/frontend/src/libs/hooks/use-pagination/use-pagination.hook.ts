import { type AsyncThunk, type UnknownAction } from "@reduxjs/toolkit";

import { PaginationActions } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useReducer,
} from "~/libs/hooks/hooks.js";
import { type PaginationQuery, type ValueOf } from "~/libs/types/types.js";

type PaginationAction = {
	payload?: number | string;
	type: ValueOf<typeof PaginationActions>;
};

type PaginationState = {
	limit: number;
	name: string;
	page: number;
};

type UsePaginationResult = PaginationState & {
	goToEnd: (totalPages: number) => void;
	goToNext: (totalPages: number) => void;
	goToPrevious: () => void;
	goToStart: () => void;
	setLimit: (newLimit: number) => void;
	setName: (newName: string) => void;
};

const START_PAGE_NUMBER = 1;
const PAGE_STEP = 1;

const initialState: PaginationState = {
	limit: 10,
	name: "",
	page: 1,
};

const paginationReducer = (
	state: PaginationState,
	action: PaginationAction,
): PaginationState => {
	switch (action.type) {
		case PaginationActions.GO_TO_END: {
			return { ...state, page: action.payload as number };
		}

		case PaginationActions.GO_TO_START: {
			return { ...state, page: 1 };
		}

		case PaginationActions.NEXT: {
			return {
				...state,
				page: Math.min(state.page + PAGE_STEP, action.payload as number),
			};
		}

		case PaginationActions.PREVIOUS: {
			return {
				...state,
				page: Math.max(state.page - PAGE_STEP, START_PAGE_NUMBER),
			};
		}

		case PaginationActions.SET_LIMIT: {
			return {
				...state,
				limit: action.payload as number,
				page: START_PAGE_NUMBER,
			};
		}

		case PaginationActions.SET_NAME: {
			return {
				...state,
				name: action.payload as string,
				page: START_PAGE_NUMBER,
			};
		}

		default: {
			return state;
		}
	}
};

const usePagination = <Result, ThunkCfg extends object = object>(
	action: AsyncThunk<Result, PaginationQuery, ThunkCfg>,
): UsePaginationResult => {
	const [state, localDispatch] = useReducer(paginationReducer, initialState);
	const dispatch = useAppDispatch();

	const goToStart = useCallback((): void => {
		localDispatch({ type: PaginationActions.GO_TO_START });
	}, []);
	const goToEnd = useCallback((totalPages: number): void => {
		localDispatch({ payload: totalPages, type: PaginationActions.GO_TO_END });
	}, []);
	const goToNext = useCallback((totalPages: number): void => {
		localDispatch({ payload: totalPages, type: PaginationActions.NEXT });
	}, []);
	const goToPrevious = useCallback((): void => {
		localDispatch({ type: PaginationActions.PREVIOUS });
	}, []);
	const setLimit = useCallback((newLimit: number | string): void => {
		localDispatch({ payload: newLimit, type: PaginationActions.SET_LIMIT });
	}, []);
	const setName = useCallback((newName: string): void => {
		localDispatch({ payload: newName, type: PaginationActions.SET_NAME });
	}, []);

	useEffect(() => {
		dispatch(
			action({
				limit: String(state.limit),
				page: String(state.page),
				search: state.name,
			}) as unknown as UnknownAction,
		);
	}, [state.limit, state.name, state.page]);

	return {
		...state,
		goToEnd,
		goToNext,
		goToPrevious,
		goToStart,
		setLimit,
		setName,
	};
};

export { usePagination };
