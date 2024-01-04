import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Community from 'App/Modules/Communities/Community'
import { faker } from '@faker-js/faker';
import { Photo, createClient } from 'pexels';
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm';
import Config from '@ioc:Adonis/Core/Config'

export default class extends BaseSeeder {
  public async run () {
    const data = await Promise.all(Array.from({ length: 10 }, async () : Promise<Partial<ModelAttributes<Community>>> => {
      const randomImage = await createClient(Config.get('pexels.apiKey')).photos.random()

      return {
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        image: (randomImage as Photo).src.medium,
        location: faker.location.city()
      }
    }))

    await Community.createMany(data)
  }
}
