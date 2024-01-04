import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from "App/Modules/Events/Event";
import GetEventsValidator from 'App/Modules/Events/Validators/GetEventsValidator';

export default class EventsController {

    public async index(ctx: HttpContextContract) {
        const query = await ctx.request.validate(GetEventsValidator)

        return await Event.query()
            .whereILike('name', `%${query.search ?? ''}%`)
            .preload('community')
            .paginate(query.page ?? 1, query.perPage ?? 10)
    }

    public async show(ctx: HttpContextContract) {
        return {
            data: await Event.query().preload('community').where('id', ctx.params.id).firstOrFail()
        }
    }

}