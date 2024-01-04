import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
    constructor (protected ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string([
            rules.required(),
            rules.email()
        ]),
        password: schema.string([
            rules.required()
        ])
    })

    public messages: CustomMessages = {}
}