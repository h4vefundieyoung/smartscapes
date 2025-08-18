import {
	DashboardHeading,
	PointsOfInterestTable,
} from "./libs/components/components.js";

const ManageRoutes = (): React.JSX.Element => {
	return (
		<>
			<DashboardHeading
				subtitle="Manage points of interest and routes."
				title="Dashboard"
			/>
			<PointsOfInterestTable />
		</>
	);
};

export { ManageRoutes };
