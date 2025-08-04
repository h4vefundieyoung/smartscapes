import { type PointOfInterest } from "./libs/components/poi-layer/libs/types/types.js";

// Geographic coordinates for POI locations in Kyiv, Ukraine
const COORDINATES = {
	FEOFANIYA_LAKE: {
		LATITUDE: 50.346_049_545_844_28,
		LONGITUDE: 30.489_360_642_633_223,
	},
	GLASS_BRIDGE: {
		LATITUDE: 50.455_258_060_526_08,
		LONGITUDE: 30.528_914_731_601_12,
	},
	PARK_LANDSCAPE_ALLEY: {
		LATITUDE: 50.456_444_959_767_39,
		LONGITUDE: 30.512_189_772_269_98,
	},
	PLYAZH_TROESHCHYNA: {
		LATITUDE: 50.504_871_708_811_216,
		LONGITUDE: 30.568_354_431_825_888,
	},
	RIVER_GRILL: {
		LATITUDE: 50.435_811_951_232_914,
		LONGITUDE: 30.591_644_504_060_16,
	},
	SUP_KAYAK_CLUB: {
		LATITUDE: 50.495_672_989_398_045,
		LONGITUDE: 30.547_749_574_350_02,
	},
} as const;

const MOCK_POI_DATA: PointOfInterest[] = [
	{
		id: 1,
		location: {
			coordinates: [
				COORDINATES.SUP_KAYAK_CLUB.LONGITUDE,
				COORDINATES.SUP_KAYAK_CLUB.LATITUDE,
			],
			type: "Point",
		},
		name: "SUP Kayak Club 4 Storony",
	},
	{
		id: 2,
		location: {
			coordinates: [
				COORDINATES.RIVER_GRILL.LONGITUDE,
				COORDINATES.RIVER_GRILL.LATITUDE,
			],
			type: "Point",
		},
		name: "River Grill, Rusanivska Embankment",
	},
	{
		id: 3,
		location: {
			coordinates: [
				COORDINATES.FEOFANIYA_LAKE.LONGITUDE,
				COORDINATES.FEOFANIYA_LAKE.LATITUDE,
			],
			type: "Point",
		},
		name: "Feofaniya Lake Pavilion",
	},
	{
		id: 4,
		location: {
			coordinates: [
				COORDINATES.GLASS_BRIDGE.LONGITUDE,
				COORDINATES.GLASS_BRIDGE.LATITUDE,
			],
			type: "Point",
		},
		name: "Glass Bridge",
	},
	{
		id: 5,
		location: {
			coordinates: [
				COORDINATES.PARK_LANDSCAPE_ALLEY.LONGITUDE,
				COORDINATES.PARK_LANDSCAPE_ALLEY.LATITUDE,
			],
			type: "Point",
		},
		name: "Park Landscape Alley",
	},
	{
		id: 6,
		location: {
			coordinates: [
				COORDINATES.PLYAZH_TROESHCHYNA.LONGITUDE,
				COORDINATES.PLYAZH_TROESHCHYNA.LATITUDE,
			],
			type: "Point",
		},
		name: "Plyazh Troeshchyna",
	},
];

export { MOCK_POI_DATA };
