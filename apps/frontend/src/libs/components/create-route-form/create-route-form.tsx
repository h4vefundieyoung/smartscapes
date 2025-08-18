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
	onSubmit?: (data: RouteCreateRequestDto) => void;
	onClose?: () => void;
	registerCleanup?: (cleanupFn: () => void) => void;
};

const STORAGE_KEY = "create-route-form-data";

const CreateRouteForm = ({
	onSubmit,
	onClose,
	registerCleanup,
}: Properties = {}): React.JSX.Element => {
	const [searchParams] = useSearchParams();
	const hasBeenSubmittedRef = useRef(false);

	const {
		control,
		handleSubmit: handleFormSubmit,
		handleValueSet,
		errors,
	} = useAppForm<RouteCreateRequestDto>({
		defaultValues: { name: "", description: "", pois: [] },
		validationSchema: routesCreateValidationSchema,
	});

	const plannedRouteId = searchParams.get("plannedRouteId");
	const isRouteConstructed = Boolean(plannedRouteId);

	useEffect(() => {
		const savedData = localStorage.getItem(STORAGE_KEY);
		if (!savedData) return;

		try {
			const { name, description } = JSON.parse(savedData);
			if (name) handleValueSet("name", name);
			if (description) handleValueSet("description", description);
		} catch {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, [handleValueSet]);

	useEffect(() => {
		const subscription = control._subjects.state.subscribe({
			next: () => {
				const { name = "", description = "" } = control._formValues;

				if (name || description) {
					localStorage.setItem(
						STORAGE_KEY,
						JSON.stringify({ name, description }),
					);
				}
			},
		});

		return () => subscription.unsubscribe();
	}, [control]);

	const handleModalClose = useCallback(() => {
		if (!hasBeenSubmittedRef.current) {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, []);

	useEffect(() => {
		registerCleanup?.(handleModalClose);
	}, [registerCleanup, handleModalClose]);

	const handleSubmit = handleFormSubmit((data: RouteCreateRequestDto) => {
		if (!isRouteConstructed || !onSubmit) return;

		hasBeenSubmittedRef.current = true;
		onSubmit({
			name: data.name,
			description: data.description,
			pois: [],
		});
		localStorage.removeItem(STORAGE_KEY);
		onClose?.();
	});

	const handleConstructRouteClick = () => {
		const { name = "", description = "" } = control._formValues;

		if (name || description) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, description }));
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
					<label className={styles["label"]}>Route</label>
					<div className={styles["route-section"]}>
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
