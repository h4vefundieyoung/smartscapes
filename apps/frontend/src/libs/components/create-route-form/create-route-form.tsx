import { Button, Input, TextArea } from "~/libs/components/components.js";
import { useAppForm, useEffect, useWatch } from "~/libs/hooks/hooks.js";
import {
	type RouteCreateRequestDto,
	routesCreateValidationSchema,
} from "~/modules/routes/routes.js";

import { DEFAULT_CREATE_ROUTE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	createRouteFormData?: null | Partial<RouteCreateRequestDto>;
	onFormChange?: (data: Partial<RouteCreateRequestDto>) => void;
	onSubmit: (data: RouteCreateRequestDto) => void;
};

const CreateRouteForm = ({
	createRouteFormData,
	onFormChange,
	onSubmit,
}: Properties): React.JSX.Element => {
	const { control, errors, handleSubmit, handleValueSet } =
		useAppForm<RouteCreateRequestDto>({
			defaultValues: DEFAULT_CREATE_ROUTE_PAYLOAD,
			// validationSchema: routesCreateValidationSchema,
		});

	const [name, description, plannedPathId] = useWatch({
		control,
		name: ["name", "description", "plannedPathId"],
	});

	useEffect(() => {
		if (onFormChange) {
			onFormChange({ description, name });
		}
	}, [description, name, onFormChange]);

	useEffect(() => {
		if (createRouteFormData) {
			for (const key of Object.keys(createRouteFormData) as Array<
				keyof RouteCreateRequestDto
			>) {
				const value = createRouteFormData[key];

				if (value !== undefined) {
					handleValueSet(key, value);
				}
			}
		}
	}, [createRouteFormData, handleValueSet]);

	return (
		<>
			<div className={styles["header"]}>
				<h3 className={styles["title"]}>Create new route</h3>
			</div>
			<form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
				<Input
					control={control}
					errors={errors}
					label="Name"
					name="name"
					type="text"
				/>

				<div className={styles["route-section"]}>
					<span className={styles["label"]}>Route</span>
					{Boolean(plannedPathId) && (
						<div>
							<span>Route constructed</span>
						</div>
					)}
					<div>
						<Button
							label="Construct"
							to="/manage-routes/construct?returnTo=/manage-routes?modal=create-route"
							type="button"
							variant="outlined"
						/>
					</div>
				</div>

				<TextArea
					control={control}
					errors={errors}
					label="Description"
					name="description"
					rows={5}
				/>

				<div className={styles["footer"]}>
					<div className={styles["action-buttons"]}>
						<Button label="Create" type="submit" />
					</div>
				</div>
			</form>
		</>
	);
};

export { CreateRouteForm };
