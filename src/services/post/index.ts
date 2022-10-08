import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

import { get_list_posts } from './get_list_posts'
export * from './get_list_posts'

import { get_post } from './get_post'
export * from './get_post'

import { create_post } from './create_post'
export * from './create_post'

export const post: FastifyPluginAsync = fp(async app => {
  app.addSchema({
    $id: 'post',
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string' },
    }
  })

  app.register(get_list_posts)
  app.register(get_post)
  app.register(create_post)
  // update, delete
})
