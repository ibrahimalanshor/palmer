import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('type', ['online', 'offline']).notNullable().defaultTo('online').after('description')
      table.string('location').nullable().after('type')
      table.string('link').nullable().after('location')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('type')
      table.dropColumn('location')
      table.dropColumn('link')
    })
  }
}
