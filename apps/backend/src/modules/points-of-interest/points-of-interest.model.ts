import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type PointGeometry } from "~/libs/types/types.js";

import { RouteModel } from "../routes/route.model.js";

class PointsOfInterestModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.POINTS_OF_INTEREST;
	}

	public description!: null | string;

	public location!: PointGeometry;

	public name!: string;

	public routes!: RouteModel[];

	public static readonly relationMappings = (): RelationMappings => ({
		routes: {
			join: {
				from: "points_of_interest.id",
				through: {
					from: "routes_to_pois.poi_id",
					to: "routes_to_pois.route_id",
				},
				to: "routes.id",
			},
			modelClass: RouteModel,
			relation: Model.ManyToManyRelation,
		},
	});
}

export { PointsOfInterestModel };
