import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/

export default class UnAuthorizedException extends Exception {
  constructor() {
    super('UnAuthorized', 401, 'E_UNAUTHORIZED_ACCESS')
    this.stack = undefined
  }
}
