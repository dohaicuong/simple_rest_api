import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { Post } from '@prisma/client'
import prisma from '../../clients/prisma'

export type GetPostsPayload = {
  data: Post[]
}
type GetPostsRequest = FastifyRequest<{ Reply: GetPostsPayload }>

export const get_list_posts: FastifyPluginAsync = fp(async app => {
  app.get(
    '/posts',
    {
      schema: {
        description: 'get list of posts',
        tags: ['post'],
        response: {
          200: {
            description: 'Successfully get the list of posts',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: 'post#' }
              }
            }
          }
        }
      }
    },
    async (_request: GetPostsRequest, reply) => {
      const posts = await prisma.post.findMany()
      reply.status(200).send({ data: posts })
    }
  )
})
