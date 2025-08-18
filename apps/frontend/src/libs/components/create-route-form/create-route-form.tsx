import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

import { Button, Input, TextArea } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type RouteCreateRequestDto,
	routesCreateValidationSchema,
} from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

type Properties = {
	onClose?: () => void;
	onSubmit?: (data: RouteCreateRequestDto) => void;
	registerCleanup?: (cleanupFunction: () => void) => void;
};

const STORAGE_KEY = "create-route-form-data";

const CreateRouteForm = ({
	onClose,
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
	} = useAppForm<RouteCreateRequestDto>({
		defaultValues: { description: "", name: "", pois: [] },
		validationSchema: routesCreateValidationSchema,
	});

	const plannedRouteId = searchParameters.get("plannedRouteId");
	const isRouteConstructed = Boolean(plannedRouteId);

	useEffect(() => {
		const savedData = localStorage.getItem(STORAGE_KEY);
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
			localStorage.removeItem(STORAGE_KEY);
		}
	}, [handleValueSet]);

	useEffect(() => {
		const subscription = control._subjects.state.subscribe({
			next: () => {
				const { description = "", name = "" } = control._formValues as {
					description: string;
					name: string;
				};

				if (name || description) {
					localStorage.setItem(
						STORAGE_KEY,
						JSON.stringify({ description, name }),
					);
				}
			},
		});

		return () => subscription.unsubscribe();
	}, [control]);

	const handleModalClose = useCallback((): void => {
		if (!hasBeenSubmittedReference.current) {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, []);

	useEffect(() => {
		registerCleanup?.(handleModalClose);
	}, [registerCleanup, handleModalClose]);

	const handleSubmit = handleFormSubmit((data: RouteCreateRequestDto) => {
		if (!isRouteConstructed || !onSubmit) {
			return;
		}

		hasBeenSubmittedReference.current = true;
		onSubmit({
			description: data.description,
			name: data.name,
			pois: [],
		});
		localStorage.removeItem(STORAGE_KEY);
		onClose?.();
	});

	const handleConstructRouteClick = (): void => {
		const { description = "", name = "" } = control._formValues as {
			description: string;
			name: string;
		};

		if (name || description) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ description, name }));
		}
	};

	return (
		<div>
			<h4 className={styles["title"]}>Create New Route</h4>
			<form className={styles["form"]} onSubmit={handleSubmit}>
				<div className={styles["field"]}>
					<Input control={control} errors={errors} label="Name" name="name" />
				</div>

				<div className={styles["field"]}>
					<div className={styles["route-section"]}>
						<label className={styles["label"]}>Route</label>
						{isRouteConstructed && (
							<div>
								<span>Route constructed</span>
							</div>
						)}
						<div>
							<Button
								label="Construct"
								onClick={handleConstructRouteClick}
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
