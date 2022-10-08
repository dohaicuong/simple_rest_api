import fp from 'fastify-plugin'
import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import { Post } from '@prisma/client'
import { prisma } from '../../clients/prisma'

export type GetPostsPayload = {
  data: Post[]
}
type GetPostsRequest = FastifyRequest<{ Reply: GetPostsPayload }>

export type GetPostPayload = {
  data: Post | null
}
type GetPostRequest = FastifyRequest<{
  Params: {
    postId: string
  },
  Reply: GetPostPayload
}>

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

export const post: FastifyPluginAsync = fp(async app => {
  app.get('/posts', async (_request: GetPostsRequest, reply) => {
    const posts = await prisma.post.findMany()
    reply.send({ data: posts })
  })
  
  app.get('/posts/:postId', async (request: GetPostRequest, reply) => {
    const post = await prisma.post.findUnique({
      where: { id: request.params.postId }
    })
    reply.send({ data: post })
  })
  
  app.post('/posts', async (request: CreatePostRequest, reply) => {
    const post = await prisma.post.create({
      data: request.body
    })

    reply.send({
      data: post
    })
  })

  // update, delete
})
