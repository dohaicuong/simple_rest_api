import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import prisma from '../src/clients/prisma'
import { GetPostsPayload } from '../src/services/post'

describe('GET /posts', () => {
  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  it('should return list of posts', async () => {
    await prisma.post.createMany({
      data: [
        { title: '1st post', content: 'bla bla' },
        { title: '2nd post', content: 'bla bla' },
        { title: '3rd post', content: 'bla bla' },
        { title: '4th post', content: 'bla bla' },
      ]
    })

    const res = await app
      .inject()
      .get('/posts')
    
    const body = res.json() as GetPostsPayload

    expect(res.statusCode).toBe(200)
    expect(body.data).toHaveLength(4)
    
    expect(body.data[0].title).toBe('1st post')
    expect(body.data[1].title).toBe('2nd post')
    expect(body.data[2].title).toBe('3rd post')
    expect(body.data[3].title).toBe('4th post')
  })
})
