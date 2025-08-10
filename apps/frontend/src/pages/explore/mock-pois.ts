const SUP_KAYAK_CLUB_4_STORONY_LAT = 50.495;
const SUP_KAYAK_CLUB_4_STORONY_LNG = 30.547;
const RIVER_GRILL_LAT = 50.435;
const RIVER_GRILL_LNG = 30.591;
const FEOFANIYA_LAKE_PAVILION_LAT = 50.346;
const FEOFANIYA_LAKE_PAVILION_LNG = 30.489;
const GLASS_BRIDGE_LAT = 50.455;
const GLASS_BRIDGE_LNG = 30.528;
const PARK_LANDSCAPE_ALLEY_LAT = 50.456;
const PARK_LANDSCAPE_ALLEY_LNG = 30.512;
const PLYAZH_TROESHCHYNA_LAT = 50.504;
const PLYAZH_TROESHCHYNA_LNG = 30.568;

const mockPOIs = [
	{
		coordinates: [
			SUP_KAYAK_CLUB_4_STORONY_LNG,
			SUP_KAYAK_CLUB_4_STORONY_LAT,
		] as [number, number],
		id: "1",
		name: "SUP Kayak Club 4 Storony",
	},
	{
		coordinates: [RIVER_GRILL_LNG, RIVER_GRILL_LAT] as [number, number],
		id: "2",
		name: "River Grill, Rusanivska Embankment",
	},
	{
		coordinates: [FEOFANIYA_LAKE_PAVILION_LNG, FEOFANIYA_LAKE_PAVILION_LAT] as [
			number,
			number,
		],
		id: "3",
		name: "Feofaniya Lake Pavilion",
	},
	{
		coordinates: [GLASS_BRIDGE_LNG, GLASS_BRIDGE_LAT] as [number, number],
		id: "4",
		name: "Glass Bridge",
	},
	{
		coordinates: [PARK_LANDSCAPE_ALLEY_LNG, PARK_LANDSCAPE_ALLEY_LAT] as [
			number,
			number,
		],
		id: "5",
		name: "Park Landscape Alley",
	},
	{
		coordinates: [PLYAZH_TROESHCHYNA_LNG, PLYAZH_TROESHCHYNA_LAT] as [
			number,
			number,
		],
		id: "6",
		name: "Plyazh Troeshchyna",
	},
];

export { mockPOIs };
