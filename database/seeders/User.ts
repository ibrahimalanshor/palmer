import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Community from 'App/Modules/Communities/Community'
import User from 'App/Modules/Users/User'
import { string } from '@ioc:Adonis/Core/Helpers'
import Hash from '@ioc:Adonis/Core/Hash'

export default class extends BaseSeeder {
  public async run () {
    const community = await Community.first()

    await User.create({
      email: `${string.snakeCase((community?.name as string).toLowerCase())}@email.com`,
      password: await Hash.make('password'),
      community_id: community?.id
    })
  }
}
