import { Button, Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	usePagination,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import {
	type RouteCreateRequestDto,
	actions as routesActions,
	routesCreateValidationSchema,
} from "~/modules/routes/routes.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { CreateRouteModal } from "../components.js";
import { DEFAULT_CREATE_ROUTE_PAYLOAD } from "./libs/constants/constants.js";
import { useTableColumns } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const DEFAULT_TOTAL_PAGES = 1;

const RoutesTable = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const columns = useTableColumns();
	const [searchParameters, setSearchParameters] = useSearchParams();

	const routes = useAppSelector(({ routes }) => routes.data);
	const routesMeta = useAppSelector(({ routes }) => routes.meta);
	const routesStatus = useAppSelector(({ routes }) => routes.dataStatus);
	const createStatus = useAppSelector(({ routes }) => routes.createStatus);
	const createRouteFormData = useAppSelector(
		({ routes }) => routes.createRouteFormData,
	);

	const authenticatedUser = useAppSelector(
		(state) => state.auth.authenticatedUser,
	) as UserAuthResponseDto;

	const {
		control,
		errors,
		getValues,
		handleReset,
		handleSubmit,
		handleValueSet,
	} = useAppForm<RouteCreateRequestDto>({
		defaultValues: DEFAULT_CREATE_ROUTE_PAYLOAD,
		validationSchema: routesCreateValidationSchema,
	});

	const plannedRouteId = Number(searchParameters.get("plannedRouteId"));

	const saveFormData = useCallback(async () => {
		const currentFormData = getValues();
		const hasData = Object.keys(currentFormData).some((key) => {
			const value = currentFormData[key as keyof RouteCreateRequestDto];

			return Boolean(value);
		});

		if (hasData) {
			await dispatch(
				routesActions.preserveCreateRouteFormData(currentFormData),
			);
		}
	}, [dispatch, getValues]);

	const isModalOpen = searchParameters.get("modal") === "create-route";

	const clearModalAndReset = useCallback(() => {
		void dispatch(routesActions.discardCreateRouteFormData(null));
		handleReset(DEFAULT_CREATE_ROUTE_PAYLOAD);

		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.delete("modal");
			newParameters.delete("plannedRouteId");

			return newParameters;
		});
	}, [dispatch, handleReset, setSearchParameters]);

	const handleModalOpen = useCallback(() => {
		void dispatch(routesActions.discardCreateRouteFormData(null));

		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.set("modal", "create-route");

			return newParameters;
		});
	}, [setSearchParameters, dispatch]);

	const handleModalClose = useCallback(async (): Promise<void> => {
		await saveFormData();
		clearModalAndReset();
	}, [saveFormData, clearModalAndReset]);

	const handleRouteSubmit = useCallback(
		(data: RouteCreateRequestDto): void => {
			const submitData: RouteCreateRequestDto = {
				...data,
				createdByUserId: authenticatedUser.id,
				plannedPathId: plannedRouteId,
			};

			void dispatch(routesActions.create(submitData));
		},
		[dispatch, authenticatedUser.id, plannedRouteId],
	);

	const pagination = usePagination({
		meta: routesMeta,
		queryParameterPrefix: "routes",
	});

	const { page, pageSize } = pagination;

	const { total = 0, totalPages = DEFAULT_TOTAL_PAGES } = routesMeta ?? {};

	useEffect(() => {
		void dispatch(
			routesActions.findAll({
				page,
				perPage: pageSize,
			}),
		);
	}, [dispatch, page, pageSize]);

	useEffect(() => {
		if (isModalOpen) {
			void dispatch(routesActions.restoreCreateRouteFormData(null));
		}
	}, [dispatch, isModalOpen]);

	useEffect(() => {
		if (createRouteFormData) {
			handleReset({
				...DEFAULT_CREATE_ROUTE_PAYLOAD,
				...createRouteFormData,
			});
		}

		if (authenticatedUser.id) {
			handleValueSet("createdByUserId", authenticatedUser.id);
		}
	}, [createRouteFormData, handleReset, authenticatedUser.id, handleValueSet]);

	useEffect(() => {
		if (createStatus === DataStatus.FULFILLED) {
			clearModalAndReset();
			dispatch(routesActions.resetCreateStatus());
		}
	}, [dispatch, createStatus, clearModalAndReset]);

	useEffect(() => {
		const handleVisibilityChange = (): void => {
			if (document.visibilityState === "hidden" && isModalOpen) {
				void saveFormData();
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return (): void => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [saveFormData, isModalOpen]);

	return (
		<section className={styles["container"]}>
			<div className={styles["header"]}>
				<h2 className={styles["title"]}>Routes</h2>
				<div>
					<Button
						label="Create route"
						onClick={handleModalOpen}
						type="button"
					/>
				</div>
			</div>
			<CreateRouteModal
				control={control}
				errors={errors}
				handleSubmit={handleSubmit}
				isOpen={isModalOpen}
				onClose={handleModalClose}
				onSubmit={handleRouteSubmit}
				plannedRouteId={plannedRouteId}
			/>
			<div className={styles["table-container"]}>
				<Table
					columns={columns}
					data={routes}
					isLoading={routesStatus === DataStatus.PENDING}
					paginationSettings={pagination}
					totalItems={total}
					totalPages={totalPages}
				/>
			</div>
		</section>
	);
};

export { RoutesTable };
