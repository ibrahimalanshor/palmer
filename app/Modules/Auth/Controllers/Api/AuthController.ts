import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Modules/Auth/Validators/LoginValidator'

export default class AuthController {
    public async login(ctx: HttpContextContract) {
        const body = await ctx.request.validate(LoginValidator)

        return await ctx.auth.use('api').attempt(body.email, body.password)
    }
}