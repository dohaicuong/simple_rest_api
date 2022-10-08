import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import { prisma } from '../src/clients/prisma'
import { GetPostPayload } from '../src/domains/post'

describe('GET /posts/:id', () => {
  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  it('should return post with id', async () => {
    const created_post = await prisma.post.create({
      data: { title: '1st post', content: 'bla bla' }
    })

    const res = await app
      .inject()
      .get(`/posts/${created_post.id}`)

    const body = res.json() as GetPostPayload
    
    expect(res.statusCode).toBe(200)
    expect(body.data?.id).toBe(created_post.id)
  })
})
