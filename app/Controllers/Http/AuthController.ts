import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const alreadyHasUser = await User.findBy('email', email)

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
  }
}
