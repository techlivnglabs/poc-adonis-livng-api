import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Property from 'App/Models/Property'

export default class PropertiesController {
  public async index({}: HttpContextContract) {
    const properties = await Property.query()
    return properties
  }

  public async store({ request }: HttpContextContract) {
    const data = request.all()
    const savedProperty = await Property.create(data)
    return savedProperty.id
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
