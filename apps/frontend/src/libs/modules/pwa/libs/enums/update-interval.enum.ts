const TimeConstants = {
	MILLISECONDS_IN_SECOND: 1000,
	MINUTES_IN_HOUR: 60,
	SECONDS_IN_MINUTE: 60,
} as const;

const UpdateInterval = {
	DEFAULT:
		TimeConstants.MINUTES_IN_HOUR *
		TimeConstants.SECONDS_IN_MINUTE *
		TimeConstants.MILLISECONDS_IN_SECOND,
} as const;

export { UpdateInterval };
