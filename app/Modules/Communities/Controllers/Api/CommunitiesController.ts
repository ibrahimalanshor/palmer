import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Community from "App/Modules/Communities/Community";
import GetCommunitiesValidator from '../../Validators/GetCommunitiesValidator';

export default class CommunitiesController {

    public async index(ctx: HttpContextContract) {
        const query = await ctx.request.validate(GetCommunitiesValidator)

        return await Community.query()
            .whereILike('name', `%${query.search ?? ''}%`)
            .paginate(query.page ?? 1, query.perPage ?? 10)
    }

}