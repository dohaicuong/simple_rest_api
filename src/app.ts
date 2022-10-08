import fastify from 'fastify'

import { post } from './domains/post'

export const app = fastify()

app.get('/', () => ({ service: 'have-fun', version: '1.0.0' }))

app.register(post)
