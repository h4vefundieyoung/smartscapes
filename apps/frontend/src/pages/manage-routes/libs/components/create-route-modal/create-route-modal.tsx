import { CreateRouteForm, Modal } from "~/libs/components/components.js";
import { type RouteCreateRequestDto } from "~/modules/routes/routes.js";

type Properties = {
	formData: null | Partial<RouteCreateRequestDto>;
	isOpen: boolean;
	onClose: () => void;
	onFormChange: (data: Partial<RouteCreateRequestDto>) => void;
	onSubmit: (data: RouteCreateRequestDto) => void;
};

const CreateRouteModal = ({
	formData,
	isOpen,
	onClose,
	onFormChange,
	onSubmit,
}: Properties): React.JSX.Element => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<CreateRouteForm
				createRouteFormData={formData}
				onFormChange={onFormChange}
				onSubmit={onSubmit}
			/>
		</Modal>
	);
};

export { CreateRouteModal };
