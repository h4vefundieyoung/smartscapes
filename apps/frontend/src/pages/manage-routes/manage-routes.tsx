import { Button } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import {
	type RouteCreateRequestDto,
	actions as routesActions,
} from "~/modules/routes/routes.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	CreateRouteModal,
	DashboardHeading,
	PointsOfInterestTable,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const ManageRoutes = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [searchParameters, setSearchParameters] = useSearchParams();

	const formData = useAppSelector((state) => state.route.formData);
	const createStatus = useAppSelector((state) => state.route.createStatus);
	const { authenticatedUser } = useAppSelector((state) => state.auth) as {
		authenticatedUser: UserAuthResponseDto;
	};

	const plannedRouteId = searchParameters.get("plannedRouteId");
	const isModalOpen = searchParameters.get("modal") === "create-route";

	const combinedFormData = {
		...formData,
		...(plannedRouteId && { plannedPathId: Number(plannedRouteId) }),
	};

	const handleModalOpen = useCallback(() => {
		void dispatch(routesActions.discardCreateRouteFormData(null));

		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.set("modal", "create-route");

			return newParameters;
		});
	}, [setSearchParameters, dispatch]);

	const handleModalClose = useCallback(async (): Promise<void> => {
		const hasData = formData && Object.keys(formData).length > 0;

		if (hasData) {
			await dispatch(routesActions.preserveCreateRouteFormData(null));
		}

		await dispatch(routesActions.discardCreateRouteFormData(null));

		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.delete("modal");
			newParameters.delete("plannedRouteId");

			return newParameters;
		});
	}, [setSearchParameters, dispatch, formData]);

	const handleFormChange = useCallback(
		(formData: Partial<RouteCreateRequestDto>) => {
			dispatch(routesActions.updateCreateRouteFormData(formData));
		},
		[dispatch],
	);

	const handleRouteSubmit = useCallback(
		(data: RouteCreateRequestDto): void => {
			const submitData: RouteCreateRequestDto = {
				...formData,
				...data,
				createdByUserId: authenticatedUser.id,
			};

			void dispatch(routesActions.create(submitData));
		},
		[dispatch, formData, authenticatedUser.id],
	);

	useEffect(() => {
		if (isModalOpen) {
			void dispatch(routesActions.restoreCreateRouteFormData(null));
		}
	}, [dispatch, isModalOpen]);

	useEffect(() => {
		if (plannedRouteId) {
			dispatch(
				routesActions.updateCreateRouteFormData({
					plannedPathId: Number(plannedRouteId),
				}),
			);
		}
	}, [plannedRouteId, dispatch]);

	useEffect(() => {
		if (createStatus === DataStatus.FULFILLED) {
			void dispatch(routesActions.discardCreateRouteFormData(null));

			setSearchParameters((previous) => {
				const newParameters = new URLSearchParams(previous);
				newParameters.delete("modal");
				newParameters.delete("plannedRouteId");

				return newParameters;
			});
		}
	}, [createStatus, dispatch, setSearchParameters]);

	useEffect(() => {
		const saveData = (): void => {
			void dispatch(routesActions.preserveCreateRouteFormData(null));
		};

		const handleVisibilityChange = (): void => {
			if (document.visibilityState === "hidden") {
				saveData();
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return (): void => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [dispatch]);

	return (
		<main className={styles["container"]}>
			<DashboardHeading
				subtitle="Manage points of interest and routes."
				title="Dashboard"
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
						formData={combinedFormData}
						isOpen={isModalOpen}
						onClose={handleModalClose}
						onFormChange={handleFormChange}
						onSubmit={handleRouteSubmit}
					/>
				</div>
			</section>
		</main>
	);
};

export { ManageRoutes };
