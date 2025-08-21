import { CreateRouteForm, Modal } from "~/libs/components/components.js";
import {
	type Control,
	type FieldErrors,
	type UseFormHandleSubmit,
} from "~/libs/types/types.js";
import { type RouteCreateRequestDto } from "~/modules/routes/routes.js";

type Properties = {
	control: Control<RouteCreateRequestDto>;
	errors: FieldErrors<RouteCreateRequestDto>;
	handleSubmit: UseFormHandleSubmit<RouteCreateRequestDto>;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: RouteCreateRequestDto) => void;
	plannedRouteId: number | undefined;
};

const CreateRouteModal = ({
	control,
	errors,
	handleSubmit,
	isOpen,
	onClose,
	onSubmit,
	plannedRouteId,
}: Properties): React.JSX.Element => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<CreateRouteForm
				control={control}
				errors={errors}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				plannedRouteId={plannedRouteId}
			/>
		</Modal>
	);
};

export { CreateRouteModal };
