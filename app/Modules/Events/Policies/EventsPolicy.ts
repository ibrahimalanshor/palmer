import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Modules/Users/User'
import Community from 'App/Modules/Communities/Community'
import Event from 'App/Modules/Events/Event'

export default class EventsPolicy extends BasePolicy {
	public async create(user: User, communty: Community) {
		if (!user.is_registration_complete || !communty.is_active) {
			return false
		}

		return user.community_id === communty.id
	}

	public async update(user: User, event: Event) {
		return user.community_id === event.community_id
	}

	public async destroy(user: User, event: Event) {
		return user.community_id === event.community_id
	}
}
