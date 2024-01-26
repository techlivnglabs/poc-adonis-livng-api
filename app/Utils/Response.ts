type Props = {
  success?: boolean
  error?: {
    message: string
  } | null
  result: any
}

export class Response {
  public result: any
  public success: boolean
  public error: {
    message: string
  } | null

  constructor({ result = null, error = null, success = true }: Props) {
    this.error = error
    this.result = result
    this.success = success
  }
}
