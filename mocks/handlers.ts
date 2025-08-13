import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'

const equipments = {
  success: http.get('/api/equipments', () => {
    const data = Array.from({ length: 3 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
    }))
    return HttpResponse.json(data)
  }),
  empty: http.get('/api/equipments', () => HttpResponse.json([])),
  error500: http.get('/api/equipments', () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 }),
  ),
}

export const handlers = { equipments }
