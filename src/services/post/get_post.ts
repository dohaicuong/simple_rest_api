import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { Post } from '@prisma/client'
import prisma from '../../clients/prisma'

export type GetPostPayload = {
  data: Post | null
}
type GetPostRequest = FastifyRequest<{
  Params: {
    postId: string
  },
  Reply: GetPostPayload
}>

export const get_post: FastifyPluginAsync = fp(async app => {
  app.get(
    '/posts/:postId',
    {
      schema: {
        description: 'get single post',
        tags: ['post'],
        params: {
          type: 'object',
          properties: {
            postId: { type: 'string' },
          }
        },
        response: {
          200: {
            description: 'Successfully get the post',
            type: 'object',
            properties: {
              data: { $ref: 'post#' }
            }
          }
        }
      }
    },
    async (request: GetPostRequest, reply) => {
      const post = await prisma.post.findUnique({
        where: { id: request.params.postId }
      })
      reply.status(200).send({ data: post })
    }
  )
})
