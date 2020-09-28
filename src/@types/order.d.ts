interface ServicePlanThumbInstance {
	/** Thumbnail width */
	width: string

	/** Thumbnail source URL */
	source: string
}

interface ServicePlanFeaturedInstance {
	/** Plan name */
	name: string

	/** Plan id */
	id: string

	/** Plan min price */
	min_price?: number

	/** Plan features */
	features: Array<string>
}

interface ServicePlanTechstackInstance {
	/** Icon name */
	name: string

	/** Icon source URL */
	source: string
}

interface ServicePlanInstance {
	/** Plan id */
	id: string

	/** Plan name */
	name: string

	/** About plan */
	about: string

	/** Plan thumbnail */
	thumb: ServicePlanThumbInstance

	/** Featured plans */
	featured: Array<ServicePlanFeaturedInstance>

	/** Plan min price */
	min_price?: number

	/** Plan facilities */
	facilities: Array<string>
}