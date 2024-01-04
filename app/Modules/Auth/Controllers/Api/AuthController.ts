import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Modules/Auth/Validators/LoginValidator'
import RegisterValidator from 'App/Modules/Auth/Validators/RegisterValidator'
import Community from 'App/Modules/Communities/Community'
import User from 'App/Modules/Users/User'

export default class AuthController {
    public async login(ctx: HttpContextContract) {
        const body = await ctx.request.validate(LoginValidator)

        return await ctx.auth.use('api').attempt(body.email, body.password)
    }

    public async register(ctx: HttpContextContract) {
        const body = await ctx.request.validate(RegisterValidator)

        const community = await Community.create({
            name: body.name
        })
        const user = await User.create({
            email: body.email,
            password: body.password,
            community_id: community.id
        })

        return await ctx.auth.use('api').generate(user)
    }

    public me(ctx: HttpContextContract) {
        return {
            data: ctx.auth.user
        }
    }
}