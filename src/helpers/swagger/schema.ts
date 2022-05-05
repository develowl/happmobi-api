import {
  ReferenceObject,
  SchemaObject
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { RentalStatus } from 'src/enums/rental.enum'
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
      type: 'string',
      example: '2022-05-04T14:35:59.336Z'
    },
    updatedAt: {
      type: 'string',
      example: '2022-05-04T14:35:59.336Z'
    }
  }
}

export const CarSchema: SchemaObject = {
  properties: {
    id: {
      type: 'string',
      example: 'fd0a8564-26a9-4213-bb6e-4376dd10aec4'
    },
    licensePlate: {
      type: 'string',
      uniqueItems: true,
      example: 'KLM7654'
    },
    name: {
      type: 'string',
      example: 'Gol'
    },
    brand: {
      type: 'string',
      example: 'Volkswagen'
    },
    dailyRate: {
      type: 'number',
      example: 25
    },
    fineAmount: {
      type: 'number',
      example: 33
    },
    available: {
      type: 'boolean',
      example: true
    },
    createdAt: {
      type: 'string',
      example: '2022-05-03T20:24:55.474Z'
    },
    updatedAt: {
      type: 'string',
      example: '2022-05-03T20:24:55.474Z'
    }
  }
}

export const RentalSchema: SchemaObject = {
  properties: {
    id: {
      type: 'string',
      example: '2a5bb5f1-133a-4927-afae-9184aa3cf413'
    },
    startDate: {
      type: 'string',
      example: '2022-05-03T20:20:53.773Z'
    },
    endDate: {
      type: 'string',
      example: null
    },
    expectEndDate: {
      type: 'string',
      example: '2022-05-20T15:00:00.000Z'
    },
    total: {
      type: 'number',
      example: 0
    },
    status: {
      type: 'string',
      enum: [RentalStatus.ACTIVE, RentalStatus.COMPLETED],
      default: RentalStatus.ACTIVE,
      example: 'active'
    },
    createdAt: {
      type: 'string',
      example: '2022-05-03T20:25:35.723Z'
    },
    updatedAt: {
      type: 'string',
      example: '2022-05-03T20:25:35.723Z'
    },
    idUser: UserSchema,
    idCar: CarSchema
  }
}

const isSchema = (schema: SchemaObject | ReferenceObject): schema is SchemaObject => {
  return 'properties' in schema && !('$ref' in schema)
}

export const mapSchemaExample = (schema: SchemaObject, example: Object = {}) => {
  Object.keys(schema.properties).map((prop) => {
    const schemaProperty = schema.properties?.[prop]
    if (isSchema(schemaProperty)) {
      example[prop] = mapSchemaExample(schemaProperty, example[prop])
    } else {
      example[prop] = schema.properties?.[prop]?.['example']
    }
  })

  return example
}
