import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { Response } from 'App/Utils/Response'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.query()
    return new Response({ result: users })
  }

  public async store({ request }: HttpContextContract) {
    const body = request.all()
    const saved = await User.create(body)
    return new Response({ result: saved.id })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
