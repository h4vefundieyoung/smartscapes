import { Button } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import {
	type RouteCreateRequestDto,
	actions as routesActions,
	routesCreateValidationSchema,
} from "~/modules/routes/routes.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	CreateRouteModal,
	DashboardHeading,
	PointsOfInterestTable,
} from "./libs/components/components.js";
import { DEFAULT_CREATE_ROUTE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const ManageRoutes = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [searchParameters, setSearchParameters] = useSearchParams();

	const createRouteFormData = useAppSelector(
		({ routes }) => routes.createRouteFormData,
	);
	const createStatus = useAppSelector(({ routes }) => routes.createStatus);
	const authenticatedUser = useAppSelector(
		(state) => state.auth.authenticatedUser,
	) as UserAuthResponseDto;

	const { control, errors, getValues, handleReset, handleSubmit } =
		useAppForm<RouteCreateRequestDto>({
			defaultValues: DEFAULT_CREATE_ROUTE_PAYLOAD,
			validationSchema: routesCreateValidationSchema,
		});

	const plannedRouteId = searchParameters.get("plannedRouteId");

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
				plannedPathId: Number(plannedRouteId),
			};

			void dispatch(routesActions.create(submitData));
		},
		[dispatch, authenticatedUser.id, plannedRouteId],
	);

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
	}, [createRouteFormData, handleReset]);

	useEffect(() => {
		if (createStatus === DataStatus.FULFILLED) {
			clearModalAndReset();
		}
	}, [createStatus, clearModalAndReset]);

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
		<main className={styles["container"]}>
			<DashboardHeading
				subtitle="Manage points of interest and routes."
				title="Manage routes"
			/>
			<PointsOfInterestTable />

			<section>
				<h2>Routes</h2>
				<div>
					<Button
						label="Create new route"
						onClick={handleModalOpen}
						type="button"
					/>
					<CreateRouteModal
						control={control}
						errors={errors}
						handleSubmit={handleSubmit}
						isOpen={isModalOpen}
						onClose={handleModalClose}
						onSubmit={handleRouteSubmit}
						plannedRouteId={plannedRouteId ? Number(plannedRouteId) : undefined}
					/>
				</div>
			</section>
		</main>
	);
};

export { ManageRoutes };
