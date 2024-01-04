import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetEventsValidator {
    constructor (protected ctx: HttpContextContract) {}

    public schema = schema.create({
        page: schema.number.optional(),
        perPage: schema.number.optional(),
        search: schema.string.nullableAndOptional(),
        community_id: schema.number.optional(),
        include_community: schema.boolean.optional()
    })

    public messages: CustomMessages = {}
}