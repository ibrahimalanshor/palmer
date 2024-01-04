import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('events', 'EventsController').only(['index', 'show', 'store', 'update']).as('events').middleware({
        store: ['auth'],
        update: ['auth']
    })
}).namespace('App/Modules/Events/Controllers/Api').prefix('/api').as('api')