import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Community from "App/Modules/Communities/Community";

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
    public type: string

    @column()
    public location: string

    @column()
    public link: string

    @column()
    public community_id: number

    @belongsTo(() => Community, {
        foreignKey: 'community_id'
    })
    public community: BelongsTo<typeof Community>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}