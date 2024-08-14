export interface JwtPayload {
  id: string;

  fullName: string;

  roles: string[];
  //TODO: agregar todo lo que quieran grabar en el JWT.
}
