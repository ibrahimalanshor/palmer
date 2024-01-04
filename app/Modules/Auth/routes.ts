import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/login', 'AuthController.login').as('login')
    Route.post('/register', 'AuthController.register').as('register')
}).as('auth.').prefix('/api').namespace('App/Modules/Auth/Controllers/Api')