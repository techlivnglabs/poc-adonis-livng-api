import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.query()
    return users
  }

  public async store({ request }: HttpContextContract) {
    const body = request.all()
    const saved = await User.create(body)
    return saved.id
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
