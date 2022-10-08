import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import { prisma } from '../src/clients/prisma'
import { CreatePostInput, CreatePostPayload } from '../src/domains/post'

describe('POST /posts', () => {
  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  it('should return created post', async () => {
    const input: CreatePostInput = {
      title: 'first post',
      content: 'some content'
    }

    const res = await app
      .inject()
      .post('/posts')
      .body(input)

    const body = res.json() as CreatePostPayload
    
    expect(res.statusCode).toBe(200)
    expect(body.data?.id).toBeDefined()
    expect(body.data.title).toBe(input.title)
    expect(body.data.content).toBe(input.content)
  })
})
