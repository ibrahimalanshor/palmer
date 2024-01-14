import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Community from "App/Modules/Communities/Community";
import GetCommunitiesValidator from 'App/Modules/Communities/Validators/GetCommunitiesValidator';

export default class CommunitiesController {

    public async index(ctx: HttpContextContract) {
        const query = await ctx.request.validate(GetCommunitiesValidator)

        return await Community.query()
            .whereILike('name', `%${query.search ?? ''}%`)
            .where('is_active', true)
            .paginate(query.page ?? 1, query.perPage ?? 10)
    }

    public async show(ctx: HttpContextContract) {
        return {
            data: await Community.query().where('is_active', true).where('id', ctx.params.id).firstOrFail()
        }
    }

}