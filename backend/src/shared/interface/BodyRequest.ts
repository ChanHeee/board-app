import { AuthRequest } from "./AuthRequest"

export interface BodyRequest<T> extends AuthRequest {
  body: T
}
