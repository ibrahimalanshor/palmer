import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'communities'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('image').nullable().alter()
    })
  }

  public async down () {
  }
}
