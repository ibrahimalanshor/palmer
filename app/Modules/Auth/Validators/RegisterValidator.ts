import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
    constructor (protected ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string([
            rules.required(),
            rules.email(),
            rules.unique({
                table: 'users',
                column: 'email'
            })
        ]),
        password: schema.string([
            rules.required()
        ]),
        name: schema.string([
            rules.required()
        ])
    })

    public messages: CustomMessages = {}
}