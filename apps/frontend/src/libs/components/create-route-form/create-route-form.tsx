import { Button, Input, TextArea } from "~/libs/components/components.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useRef,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import {
	type RouteCreateRequestDto,
	routesCreateValidationSchema,
} from "~/modules/routes/routes.js";

import { DEFAULT_CREATE_ROUTE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit?: (data: RouteCreateRequestDto) => void;
	registerCleanup?: (cleanupFunction: () => void) => void;
};

const CreateRouteForm = ({
	onSubmit,
	registerCleanup,
}: Properties = {}): React.JSX.Element => {
	const [searchParameters] = useSearchParams();
	const hasBeenSubmittedReference = useRef(false);

	const {
		control,
		errors,
		handleSubmit: handleFormSubmit,
		handleValueSet,
	} = useAppForm({
		defaultValues: DEFAULT_CREATE_ROUTE_PAYLOAD,
		validationSchema: routesCreateValidationSchema,
	});

	const plannedRouteId = searchParameters.get("plannedRouteId");
	const isRouteConstructed = Boolean(plannedRouteId);

	useEffect(() => {
		const loadSavedData = async (): Promise<void> => {
			const savedData = await storage.get(StorageKey.CREATE_ROUTE_FORM_DATA);

			if (!savedData) {
				return;
			}

			try {
				const { description, name } = JSON.parse(savedData) as {
					description: string;
					name: string;
				};

				if (name) {
					handleValueSet("name", name);
				}

				if (description) {
					handleValueSet("description", description);
				}
			} catch {
				await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
			}
		};

		void loadSavedData();
	}, [handleValueSet]);

	useEffect(() => {
		const subscription = control._subjects.state.subscribe({
			next: () => {
				const { description = "", name = "" } = control._formValues as {
					description: string;
					name: string;
				};

				if (name || description) {
					void storage.set(
						StorageKey.CREATE_ROUTE_FORM_DATA,
						JSON.stringify({ description, name }),
					);
				} else {
					void storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
				}
			},
		});

		return (): void => {
			subscription.unsubscribe();
		};
	}, [control]);

	const handleModalClose = useCallback((): void => {
		if (!hasBeenSubmittedReference.current) {
			void storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
		}
	}, []);

	useEffect((): void => {
		registerCleanup?.(handleModalClose);
	}, [registerCleanup, handleModalClose]);

	const handleSubmit = useCallback(
		(data: RouteCreateRequestDto): void => {
			if (!onSubmit) {
				return;
			}

			hasBeenSubmittedReference.current = true;
			onSubmit(data);
			void storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
		},
		[onSubmit],
	);

	return (
		<div>
			<h4 className={styles["title"]}>Create New Route</h4>
			<form
				className={styles["form"]}
				onSubmit={handleFormSubmit(handleSubmit)}
			>
				<div className={styles["field"]}>
					<Input control={control} errors={errors} label="Name" name="name" />
				</div>

				<div className={styles["field"]}>
					<div className={styles["route-section"]}>
						<span className={styles["label"]}>Route</span>
						{isRouteConstructed && (
							<div>
								<span>Route constructed</span>
							</div>
						)}
						<div>
							<Button
								label="Construct"
								to="/routes/construct?returnTo=/routes?modal=create-route"
								type="button"
								variant="outlined"
							/>
						</div>
					</div>
				</div>

				<div className={styles["field"]}>
					<TextArea
						control={control}
						errors={errors}
						label="Description"
						name="description"
						rows={5}
					/>
				</div>

				<div className={styles["footer"]}>
					<div className={styles["button-container"]}>
						<Button label="Create" type="submit" />
					</div>
				</div>
			</form>
		</div>
	);
};

export { CreateRouteForm };
