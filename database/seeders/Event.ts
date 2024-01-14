import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Event from 'App/Modules/Events/Event'
import { fa, faker } from '@faker-js/faker';
import { Photo, createClient } from 'pexels';
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm';
import Config from '@ioc:Adonis/Core/Config'
import Community from 'App/Modules/Communities/Community';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  public async run () {
    const communities = await Community.all()

    const events: Partial<ModelAttributes<Event>>[] = [
      {
        name: 'Belajar Memanfaatkan Air Hukan',
        description: faker.lorem.sentence(),
        type: 'offline',
        location: 'Jombor, Sleman',
        date: DateTime.fromJSDate(faker.date.soon())
      },
      {
        name: 'Belajar Memaknai Air Hujan Dengan Gembira',
        description: faker.lorem.sentence(),
        type: 'offline',
        location: 'Sapuran, Purworejo',
        date: DateTime.fromJSDate(faker.date.soon())
      },
      {
        name: 'Belajar Kandungan Dalam Air Hujan',
        description: faker.lorem.sentence(),
        type: 'online',
        link: faker.internet.url(),
        platform: 'zoom',
        date: DateTime.fromJSDate(faker.date.soon())
      },
      {
        name: 'Belajar Kandungan Dalam Air Hujan',
        description: faker.lorem.sentence(),
        type: 'online',
        link: faker.internet.url(),
        platform: 'zoom',
        date: DateTime.fromJSDate(faker.date.soon())
      },
      {
        name: 'Misteri Tentang Hujan',
        description: faker.lorem.sentence(),
        type: 'online',
        link: faker.internet.url(),
        platform: 'zoom',
        date: DateTime.fromJSDate(faker.date.soon())
      },
      {
        name: 'Fakta dan Mitos Tentang Hujan',
        description: faker.lorem.sentence(),
        type: 'online',
        link: faker.internet.url(),
        platform: 'zoom',
        date: DateTime.fromJSDate(faker.date.soon())
      }
    ]

    const promises = events.map(async (event): Promise<Partial<ModelAttributes<Event>>> => ({
      ...event,
      community_id: faker.helpers.arrayElement(communities).id,
      image: (await createClient(Config.get('pexels.apiKey')).photos.random() as Photo).src.medium
    }))
    const data = await Promise.all(promises)

    await Event.createMany(data)
  }
}
