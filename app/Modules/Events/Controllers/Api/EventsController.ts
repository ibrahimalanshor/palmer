import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from "App/Modules/Events/Event";
import GetEventsValidator from 'App/Modules/Events/Validators/GetEventsValidator';
import FindEventsValidator from 'App/Modules/Events/Validators/FindEventsValidator';

export default class EventsController {

    public async index(ctx: HttpContextContract) {
        const query = await ctx.request.validate(GetEventsValidator)

        return await Event.query()
            .whereILike('name', `%${query.search ?? ''}%`)
            .if(query.includeCommunity, (queryBuilder) => {
                queryBuilder.preload('community')
            })
            .if(query.community_id, (queryBuilder) => {
                queryBuilder.where('community_id', query.community_id as number)
            })
            .paginate(query.page ?? 1, query.perPage ?? 10)
    }

    public async show(ctx: HttpContextContract) {
        const query = await ctx.request.validate(FindEventsValidator)

        return {
            data: await Event.query().if(query.includeCommunity, (queryBuilder) => {
                queryBuilder.preload('community')
            }).where('id', ctx.params.id).firstOrFail()
        }
    }

}