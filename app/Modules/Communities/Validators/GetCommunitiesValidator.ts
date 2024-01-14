import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetCommunitiesValidator {
    constructor (protected ctx: HttpContextContract) {}

    public schema = schema.create({
        page: schema.number.optional(),
        perPage: schema.number.optional(),
        search: schema.string.nullableAndOptional()
    })

    public messages: CustomMessages = {}
}