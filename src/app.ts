import fastify from 'fastify'

import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import { post } from './services/post'

export const app = fastify()

app.get('/', () => ({ service: 'have-fun', version: '1.0.0' }))

app
  .register(cors)
  .register(swagger, {
    routePrefix: '/doc',
    swagger: {
      tags: [
        { name: 'post', description: 'post related endpoints' }
      ]
    },
    exposeRoute: true,
  })
  .register(post)
