interface TeamMemberInstance {
	/** Member name */
	name: string

	/** Member role */
	role: string

	/** About member */
	about?: string

	/** Memeber profile image */
	avatar: string

	/** Member resume URL */
	resume?: string

	/** Social links */
	social: Array<SocialIconLink>	
}

interface TeamInstance {
	/** Instance type */
	type: string

	/** Instance name */
	name: string

	members: Array<TeamMemberInstance>
}