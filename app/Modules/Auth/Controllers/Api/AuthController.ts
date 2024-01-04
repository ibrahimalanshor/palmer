import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Modules/Auth/Validators/LoginValidator'
import RegisterValidator from 'App/Modules/Auth/Validators/RegisterValidator'
import Community from 'App/Modules/Communities/Community'
import User from 'App/Modules/Users/User'
import UpdateCommunityValidator from 'App/Modules/Auth/Validators/UpdateCommunityValidator'
import Drive from '@ioc:Adonis/Core/Drive'

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

    public async updateCommunity(ctx: HttpContextContract) {
        const body = await ctx.request.validate(UpdateCommunityValidator)
        const user = ctx.auth.use('api').user as User

        await user.load('community')
        await ctx.request.file('image')?.moveToDisk('./communities')

        const image = await Drive.getUrl(`communities/${body.image.fileName as string}`)
        const community = user.community as Community

        community.name = body.name
        community.location = body.location
        community.description = body.description
        community.image = image
        community.is_active = true
        
        user.is_registration_complete = true

        await community.save()
        await user.save()

        return user
    }
}