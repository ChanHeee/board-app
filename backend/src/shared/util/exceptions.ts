import httpStatus from "http-status"

class HttpError extends Error {
  status: number
  constructor(message: string, status: number, name?: string) {
    super(message)
    this.status = status
    this.name = name
  }
}

export class BadRequest extends HttpError {
  status: number
  constructor(message: string = "BadRequest") {
    super(message, httpStatus.BAD_REQUEST)
  }
}

export class Unauthorized extends HttpError {
  status: number
  constructor(message: string = "Unauthorized") {
    super(message, httpStatus.UNAUTHORIZED, "UnauthorizedError")
  }
}

export class NotFound extends HttpError {
  status: number
  constructor(message: string = "NotFound") {
    super(message, httpStatus.NOT_FOUND, "NotFoundError")
  }
}

export class Conflict extends HttpError {
  status: number
  constructor(message: string = "Conflict") {
    super(message, httpStatus.CONFLICT)
  }
}
