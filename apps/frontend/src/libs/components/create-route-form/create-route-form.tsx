import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Button, Input, Textarea } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useAppForm } from "~/libs/hooks/hooks.js";
import { actions as routesActions } from "~/modules/routes/routes.js";
import { type RoutesRequestCreateDto } from "@smartscapes/shared";

import styles from "./styles.module.css";

type Properties = {
	onClose: () => void;
	onSubmit?: (data: { description: string; name: string }) => void;
};

type FormValues = {
	description: string;
	name: string;
};

const STORAGE_KEY = "create-route-form-data";

const CreateRouteForm = ({
	onClose,
	onSubmit,
}: Properties): React.JSX.Element => {
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const [descriptionValue, setDescriptionValue] = useState("");

	const {
		control,
		handleSubmit: handleFormSubmit,
		handleValueSet,
		errors,
	} = useAppForm<FormValues>({
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const plannedRouteId = searchParams.get("plannedRouteId");

	const saveToStorage = useCallback((name: string, description: string) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, description }));
		} catch (error) {
			console.error("Failed to save to localStorage:", error);
		}
	}, []);

	useEffect(() => {
		try {
			const savedData = localStorage.getItem(STORAGE_KEY);
			if (savedData) {
				const { name: savedName, description: savedDescription } =
					JSON.parse(savedData);
				if (savedName) handleValueSet("name", savedName);
				if (savedDescription) {
					handleValueSet("description", savedDescription);
					setDescriptionValue(savedDescription);
				}
			}
		} catch (error) {
			console.error("Failed to load from localStorage:", error);
		}
	}, [handleValueSet]);

	useEffect(() => {
		const nameElement = document.querySelector(
			'input[name="name"]',
		) as HTMLInputElement;
		const name = nameElement?.value || "";
		if (name || descriptionValue) {
			saveToStorage(name, descriptionValue);
		}
	}, [descriptionValue, saveToStorage]);

	const clearStorage = useCallback(() => {
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch (error) {
			console.error("Failed to clear localStorage:", error);
		}
	}, []);

	const handleSubmit = handleFormSubmit(async (data: FormValues) => {
		if (onSubmit) {
			onSubmit(data);
		} else {
			try {
				const createData: RoutesRequestCreateDto = {
					description: data.description,
					name: data.name,
					pois: [],
				};

				await dispatch(routesActions.create(createData)).unwrap();
			} catch (error) {
				return;
			}
		}

		clearStorage();
		onClose();
	});

	const handleCancel = useCallback(() => {
		clearStorage();
		onClose();
	}, [clearStorage, onClose]);

	const handleDescriptionChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			const value = event.target.value;
			setDescriptionValue(value);
			handleValueSet("description", value);
		},
		[handleValueSet],
	);

	const isRouteConstructed = Boolean(plannedRouteId);

	return (
		<form className={styles["form"]} onSubmit={handleSubmit}>
			<div className={styles["field"]}>
				<Input
					control={control}
					errors={errors}
					label="Name"
					name="name"
					placeholder="Enter route name"
				/>
			</div>

			<div className={styles["field"]}>
				<Textarea
					label="Description"
					onChange={handleDescriptionChange}
					placeholder="Enter route description"
					required
					value={descriptionValue}
				/>
			</div>

			<div className={styles["field"]}>
				<label className={styles["label"]}>Route *</label>
				{isRouteConstructed ? (
					<div className={styles["route-constructed"]}>
						<span className={styles["route-status"]}>✓ Route constructed</span>
						<p className={styles["route-id"]}>
							Planned Route ID: {plannedRouteId}
						</p>
					</div>
				) : (
					<Button
						label="Construct route"
						to={`${AppRoute.ROOT}routes/construct?returnTo=${encodeURIComponent("/routes?modal=create-route")}`}
						type="button"
					/>
				)}
			</div>

			<div className={styles["actions"]}>
				<Button label="Cancel" onClick={handleCancel} type="button" />
				<Button label="Create Route" type="submit" />
			</div>
		</form>
	);
};

export { CreateRouteForm };
