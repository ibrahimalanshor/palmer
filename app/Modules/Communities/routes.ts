import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('communities', 'CommunitiesController').only(['index']).as('communities')
}).namespace('App/Modules/Communities/Controllers/Api').prefix('/api').as('api')