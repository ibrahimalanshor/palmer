import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Community from 'App/Modules/Communities/Community'
import { faker } from '@faker-js/faker';
import { Photo, createClient } from 'pexels';
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm';
import Config from '@ioc:Adonis/Core/Config'

export default class extends BaseSeeder {
  public async run () {
    const communities: Partial<ModelAttributes<Community>>[] = [
      {
        name: 'Komunitas Air Hujan',
        description: faker.lorem.sentence(),
        location: 'Jombor, Sleman'
      },
      {
        name: 'Komunitas Hujan Gembira',
        description: faker.lorem.sentence(),
        location: 'Sapuran, Purworejo'
      },
      {
        name: 'Komunitas Banyu Bening',
        description: faker.lorem.sentence(),
        location: 'Muntilam, Magelang'
      },
      {
        name: 'Komunitas Hujan Turun',
        description: faker.lorem.sentence(),
        location: 'Salam, Magelang'
      },
      {
        name: 'Komunitas Hujan Tampung',
        description: faker.lorem.sentence(),
        location: 'Mlati, Sleman'
      },
      {
        name: 'Komunitas Hujan Bersama',
        description: faker.lorem.sentence(),
        location: 'Kentungan, Sleman'
      }
    ]
    const promises = communities.map(async (community): Promise<Partial<ModelAttributes<Community>>> => ({
      ...community,
      image: (await createClient(Config.get('pexels.apiKey')).photos.random() as Photo).src.medium
    }))
    const data = await Promise.all(promises)

    await Community.createMany(data)
  }
}
