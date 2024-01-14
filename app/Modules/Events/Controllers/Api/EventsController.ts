import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from "App/Modules/Events/Event";
import GetEventsValidator from 'App/Modules/Events/Validators/GetEventsValidator';
import FindEventsValidator from 'App/Modules/Events/Validators/FindEventsValidator';
import StoreValidator from 'App/Modules/Events/Validators/StoreValidator'
import Drive from '@ioc:Adonis/Core/Drive'
import Community from 'App/Modules/Communities/Community';

export default class EventsController {

    public async index(ctx: HttpContextContract) {
        const query = await ctx.request.validate(GetEventsValidator)

        return await Event.query()
            .whereILike('name', `%${query.search ?? ''}%`)
            .preload('community')
            .if(query.community_id, (queryBuilder) => {
                queryBuilder.where('community_id', query.community_id as number)
            })
            .paginate(query.page ?? 1, query.perPage ?? 10)
    }

    public async show(ctx: HttpContextContract) {
        const query = await ctx.request.validate(FindEventsValidator)

        return {
            data: await Event.query().if(query.include_community, (queryBuilder) => {
                queryBuilder.preload('community')
            }).where('id', ctx.params.id).firstOrFail()
        }
    }

    public async store(ctx: HttpContextContract) {
        const body = await ctx.request.validate(StoreValidator)
        const community = await Community.findOrFail(body.community_id)

        await ctx.bouncer.with('EventsPolicy').authorize('create', community)

        await ctx.request.file('image')?.moveToDisk('./events')

        const event = await Event.create({
            name: body.name,
            description: body.description,
            community_id: body.community_id,
            image: await Drive.getUrl(`events/${body.image.fileName}`),
            type: body.type,
            ...(body.type === 'offline' ?
                {
                    location: body.location
                } :
                {
                    link: body.link,
                    platform: body.platform
                }
            ),
            date: body.date
        })

        return event
    }

    public async update(ctx: HttpContextContract) {
        const body = await ctx.request.validate(StoreValidator)
        const event = await Event.findOrFail(ctx.params.id)

        await ctx.bouncer.with('EventsPolicy').authorize('update', event)

        await ctx.request.file('image')?.moveToDisk('./events')

        event.name = body.name
        event.description = body.description
        event.image = await Drive.getUrl(`events/${body.image.fileName}`)
        event.date = body.date
        
        if (body.type === 'offline') {
            event.location = body.location as string
        } else {
            event.link = body.link as string
            event.platform = body.platform as string
        }

        await event.save()

        return event
    }

    public async destroy(ctx: HttpContextContract) {
        const event = await Event.findOrFail(ctx.params.id)

        await ctx.bouncer.with('EventsPolicy').authorize('destroy', event)

        await event.delete()

        return event
    }

}