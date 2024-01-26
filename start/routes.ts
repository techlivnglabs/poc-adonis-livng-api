/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.group(() => {
  Route.post('/login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  })

  Route.post('/register', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')

    const alreadyHasUser = await User.findBy('email', email)

    console.log(alreadyHasUser)
    if (alreadyHasUser) {
      const token = await auth.use('api').attempt(email, password)
      return token
    }

    try {
      const created = await User.create({ email, password })
      const token = await auth.use('api').attempt(created.email, created.password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  })
}).prefix('api/auth')

Route.group(() => {
  Route.resource('/users', 'UsersController').apiOnly()
  Route.resource('/property', 'PropertiesController').apiOnly()
})
  .middleware('auth')
  .prefix('api')
