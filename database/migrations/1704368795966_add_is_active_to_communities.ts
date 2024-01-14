import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'communities'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_active').defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('is_active')
    })
  }
}
