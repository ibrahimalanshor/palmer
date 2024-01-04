import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FindEventsValidator {
    constructor (protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string([
            rules.required()
        ]),
        image: schema.file({
            size: '1mb',
            extnames: ['jpg', 'gif', 'png']
        }),
        description: schema.string([
            rules.required()
        ]),
        type: schema.enum(['online', 'offline'], [
            rules.required()
        ]),
        location: schema.string.optional([
            rules.requiredWhen('type', '=', 'offline')
        ]),
        link: schema.string.optional([
            rules.requiredWhen('type', '=', 'online'),
            rules.url()
        ]),
        platform: schema.string.optional([
            rules.requiredWhen('type', '=', 'online'),
        ]),
        community_id: schema.number([
            rules.exists({
                table: 'communities',
                column: 'id'
            })
        ]),
        date: schema.date()
    })

    public messages: CustomMessages = {}
}