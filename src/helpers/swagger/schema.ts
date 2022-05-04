import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { Role } from 'src/enums/role.enum'

export const UserSchema: SchemaObject = {
  properties: {
    id: {
      type: 'string',
      example: '68d2b024-45f8-41d7-bdd7-007480d6094b'
    },
    email: {
      type: 'string',
      example: 'user@test.com'
    },
    name: {
      type: 'string',
      example: 'User'
    },
    lastname: {
      type: 'string',
      example: 'Test'
    },
    role: {
      type: 'string',
      example: Role.User,
      enum: [Role.User, Role.Admin]
    },
    createdAt: {
      type: 'Date',
      example: '2022-05-04T14:35:59.336Z'
    },
    updatedAt: {
      type: 'Date',
      example: '2022-05-04T14:35:59.336Z'
    }
  }
}

export const schemaToArrayExample = (schema: SchemaObject) => {
  const example = {}
  Object.keys(schema.properties).map((prop) => {
    example[prop] = schema.properties?.[prop]?.['example']
  })

  return example
}
