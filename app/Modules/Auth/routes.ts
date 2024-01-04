import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/login', 'AuthController.login').as('login')
    Route.post('/register', 'AuthController.register').as('register')
    Route.get('/me', 'AuthController.me').as('me').middleware('auth')
}).as('auth.').prefix('/api').namespace('App/Modules/Auth/Controllers/Api')