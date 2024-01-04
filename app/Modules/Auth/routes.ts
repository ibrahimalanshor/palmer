import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/login', 'AuthController.login').as('login')
    Route.post('/register', 'AuthController.register').as('register')

    Route.group(() => {
        Route.get('/', 'AuthController.me').as('get')
        Route.patch('/community', 'AuthController.updateCommunity').as('community')
    }).as('me').prefix('me').middleware('auth')
}).as('auth').prefix('/api').namespace('App/Modules/Auth/Controllers/Api')