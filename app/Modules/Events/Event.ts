import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Event extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public image: string

    @column()
    public description: string

    @column()
    public community_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}