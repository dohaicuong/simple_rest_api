import fastify from 'fastify'

import cors from '@fastify/cors'
import swagger from '@fastify/swagger'

import { health } from './services/health'
import { post } from './services/post'

export const app = fastify()
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
  .register(health)
  .register(post)
