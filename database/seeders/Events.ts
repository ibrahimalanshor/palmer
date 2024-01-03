import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Event from 'App/Modules/Events/Event'
import { faker } from '@faker-js/faker';
import { Photo, createClient } from 'pexels';
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm';
import Config from '@ioc:Adonis/Core/Config'

export default class extends BaseSeeder {
  public async run () {
    const data = await Promise.all(Array.from({ length: 10 }, async () : Promise<Partial<ModelAttributes<Event>>> => {
      const randomImage = await createClient(Config.get('pexels.apiKey')).photos.random()

      return {
        name: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        image: (randomImage as Photo).src.medium
      }
    }))

    await Event.createMany(data)
  }
}
