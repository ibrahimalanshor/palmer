import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCommunityValidator {
    constructor (protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string([
            rules.required()
        ]),
        location: schema.string([
            rules.required()
        ]),
        description: schema.string([
            rules.required()
        ]),
        image: schema.file({
            size: '1mb',
            extnames: ['jpg', 'gif', 'png']
        })
    })

    public messages: CustomMessages = {}
}