import {
	Button,
	CreateRouteForm,
	Modal,
} from "~/libs/components/components.js";
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

const CreateRouteModal = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [searchParameters, setSearchParameters] = useSearchParams();

	const createRouteFormData = useAppSelector(
		(state) => state.route.createRouteFormData,
	);
	const createStatus = useAppSelector((state) => state.route.createStatus);

	const plannedRouteId = searchParameters.get("plannedRouteId");
	const isModalOpen = searchParameters.get("modal") === "create-route";

	const formData = {
		...createRouteFormData,
		...(plannedRouteId && { plannedPathId: Number(plannedRouteId) }),
	};

	useEffect(() => {
		void dispatch(routesActions.restoreCreateRouteData(null));
	}, [dispatch]);

	useEffect(() => {
		if (plannedRouteId) {
			dispatch(
				routesActions.updateCreateRouteFormData({
					plannedPathId: Number(plannedRouteId),
				}),
			);
		}
	}, [plannedRouteId, dispatch]);

	const handleFormChange = useCallback(
		(formData: Partial<RouteCreateRequestDto>) => {
			dispatch(routesActions.updateCreateRouteFormData(formData));
		},
		[dispatch],
	);

	const { authenticatedUser } = useAppSelector((state) => state.auth) as {
		authenticatedUser: UserAuthResponseDto;
	};

	useEffect(() => {
		const handleBeforeUnload = (): void => {
			if (createRouteFormData) {
				void dispatch(
					routesActions.preserveCreateRouteData(createRouteFormData),
				);
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return (): void => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [createRouteFormData, dispatch]);

	useEffect(() => {
		if (createStatus === DataStatus.FULFILLED) {
			void dispatch(routesActions.discardCreateRouteData(null));
		}
	}, [createStatus, dispatch]);

	const handleRouteSubmit = useCallback(
		(data: RouteCreateRequestDto): void => {
			const submitData: RouteCreateRequestDto = {
				...createRouteFormData,
				...data,
				createdByUserId: authenticatedUser.id,
			};

			void dispatch(routesActions.create(submitData));
		},
		[dispatch, createRouteFormData, authenticatedUser.id],
	);

	const handleModalOpen = useCallback(() => {
		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.set("modal", "create-route");

			return newParameters;
		});
	}, [setSearchParameters]);

	const handleModalClose = useCallback(async (): Promise<void> => {
		await dispatch(routesActions.discardCreateRouteData(null));

		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.delete("modal");
			newParameters.delete("plannedRouteId");

			return newParameters;
		});
	}, [setSearchParameters, dispatch]);

	return (
		<>
			<Button
				label="Create new route"
				onClick={handleModalOpen}
				type="button"
			/>
			<Modal isOpen={isModalOpen} onClose={handleModalClose}>
				<CreateRouteForm
					createRouteFormData={formData}
					onFormChange={handleFormChange}
					onSubmit={handleRouteSubmit}
				/>
			</Modal>
		</>
	);
};

export { CreateRouteModal };
