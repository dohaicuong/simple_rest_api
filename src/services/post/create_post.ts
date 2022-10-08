import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { Post } from '@prisma/client'
import prisma from '../../clients/prisma'

export type CreatePostInput = {
  title: string
  content: string
}
export type CreatePostPayload = {
  data: Post
}
type CreatePostRequest = FastifyRequest<{
  Body: CreatePostInput
  Reply: CreatePostPayload
}>

export const create_post: FastifyPluginAsync = fp(async app => {
  app.addSchema({
    $id: 'post_create_input',
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string' },
    }
  })

  app.post(
    '/posts',
    {
      schema: {
        description: 'create post',
        tags: ['post'],
        body: { $ref: 'post_create_input' },
        response: {
          200: {
            description: 'Successfully create the post',
            type: 'object',
            properties: { data: { $ref: 'post#' } }
          }
        }
      }
    },
    async (request: CreatePostRequest, reply) => {
      const post = await prisma.post.create({
        data: request.body
      })
  
      reply.status(200).send({ data: post })
    }
  )
})
