import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

export const health: FastifyPluginAsync = fp(async app => {
  app.get('/', () => ({ service: 'have-fun', version: '1.0.0' }))
  app.get('/_heatlhz', () => ({ service: 'have-fun', version: '1.0.0' }))
})
