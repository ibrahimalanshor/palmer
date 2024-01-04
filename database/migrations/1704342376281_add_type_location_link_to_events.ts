import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('type', ['online', 'offline']).notNullable().defaultTo('online').after('description')
      table.string('location').nullable().after('location')
      table.string('link').nullable().after('link')
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
