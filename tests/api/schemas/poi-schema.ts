const poiSchema = {
	"properties": {
		"data": {
			"properties": {
				"description": {
					"type": "string",
				},
				"id": {
					"type": "integer",
				},
				"location": {
					"properties": {
						"coordinates": {
							"items": [
								{
									"type": "number",
								},
								{
									"type": "number",
								},
							],
							"type": "array",
						},
						"type": {
							"type": "string",
						},
					},
					"required": ["coordinates", "type"],
					"type": "object",
				},
				"name": {
					"type": "string",
				},
			},
			"required": ["id", "location", "name", "description"],
			"type": "object",
		},
	},
	"required": ["data"],
	"type": "object",
};

export { poiSchema };
