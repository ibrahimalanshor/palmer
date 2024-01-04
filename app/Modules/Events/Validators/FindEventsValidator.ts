import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FindEventsValidator {
    constructor (protected ctx: HttpContextContract) {}

    public schema = schema.create({
        includeCommunity: schema.boolean.optional()
    })

    public messages: CustomMessages = {}
}