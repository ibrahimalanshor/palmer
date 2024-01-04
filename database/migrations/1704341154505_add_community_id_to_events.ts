import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('community_id').unsigned().notNullable().references('communities.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropForeign('community_id')
      table.dropColumn('community_id')
    })
  }
}
