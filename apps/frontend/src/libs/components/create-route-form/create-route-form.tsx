import { Button, Input, TextArea } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getUrlWithQueryString } from "~/libs/helpers/helpers.js";
import {
	type Control,
	type FieldErrors,
	type UseFormHandleSubmit,
} from "~/libs/types/types.js";
import { type RouteCreateRequestDto } from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

type Properties = {
	control: Control<RouteCreateRequestDto>;
	errors: FieldErrors<RouteCreateRequestDto>;
	handleSubmit: UseFormHandleSubmit<RouteCreateRequestDto>;
	onSubmit: (data: RouteCreateRequestDto) => void;
	plannedRouteId: number | undefined;
};

const returnBackPath = getUrlWithQueryString(AppRoute.MANAGE_ROUTES, {
	modal: "create-route",
});

const constructPagePath = getUrlWithQueryString(
	`${AppRoute.MANAGE_ROUTES}/construct`,
	{
		returnTo: returnBackPath,
	},
);

const CreateRouteForm = ({
	control,
	errors,
	handleSubmit,
	onSubmit,
	plannedRouteId,
}: Properties): React.JSX.Element => {
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
					{Boolean(plannedRouteId) && (
						<div>
							<span>Route constructed</span>
						</div>
					)}
					<div>
						<Button
							label="Construct"
							to={constructPagePath}
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
