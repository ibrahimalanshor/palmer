import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Event from 'App/Modules/Events/Event'
import { faker } from '@faker-js/faker';
import { Photo, createClient } from 'pexels';
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm';
import Config from '@ioc:Adonis/Core/Config'
import Community from 'App/Modules/Communities/Community';

export default class extends BaseSeeder {
  public async run () {
    const communities = await Community.all()

    const data = await Promise.all(Array.from({ length: 10 }, async () : Promise<Partial<ModelAttributes<Event>>> => {
      const randomImage = await createClient(Config.get('pexels.apiKey')).photos.random()

      return {
        name: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        image: (randomImage as Photo).src.medium,
        community_id: faker.helpers.arrayElement(communities).id
      }
    }))

    await Event.createMany(data)
  }
}
