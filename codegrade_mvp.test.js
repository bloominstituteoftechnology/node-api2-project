const request = require('supertest')
const server = require('./api/server')
const db = require('./data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('comments').truncate()
  await db('posts').truncate()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

const post1 = {
  title: 'title 1',
  contents: 'I wish the ring had never come to me.',
}

const post2 = {
  title: 'title 2',
  contents: 'I think we should get off the road.',
}

describe('server.js', () => {
  describe('1 [GET] /api/posts', () => {
    it('can get the correct number of posts', async () => {
      let res = await request(server).get('/api/posts')
      expect(res.body).toHaveLength(0)
      await db('posts').insert(post1)
      res = await request(server).get('/api/posts')
      expect(res.body).toHaveLength(1)
      await db('posts').insert(post2)
      res = await request(server).get('/api/posts')
      expect(res.body).toHaveLength(2)
    }, 500)
    it('can get all the correct posts', async () => {
      await db('posts').insert(post1)
      await db('posts').insert(post2)
      let res = await request(server).get('/api/posts')
      expect(res.body[0]).toHaveProperty('id')
      expect(res.body[0]).toMatchObject(post1)
      expect(res.body[1]).toHaveProperty('id')
      expect(res.body[1]).toMatchObject(post2)
    }, 500)
  })
  describe('2 [GET] /api/posts/:id', () => {
    it('can get all the correct posts by id', async () => {
      await db('posts').insert(post1)
      await db('posts').insert(post2)
      let res = await request(server).get('/api/posts/1')
      expect(res.body).toHaveProperty('id')
      expect(res.body).toMatchObject(post1)
      res = await request(server).get('/api/posts/2')
      expect(res.body).toHaveProperty('id')
      expect(res.body).toMatchObject(post2)
    }, 500)
    it('reponds with a 404 if the post is not found', async () => {
      let res = await request(server).get('/api/posts/111')
      expect(res.status).toBe(404)
      expect(res.body.message).toMatch(/does not exist/i)
    }, 500)
  })
  describe('3 [POST] /api/posts', () => {
    it('responds with a 201', async () => {
      const res = await request(server).post('/api/posts').send(post1)
      expect(res.status).toBe(201)
    }, 500)
    it('responds with a new post', async () => {
      let res = await request(server).post('/api/posts').send(post1)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toMatchObject(post1)
      res = await request(server).post('/api/posts').send(post2)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toMatchObject(post2)
    }, 500)
    it('on missing title or contents responds with a 400', async () => {
      let res = await request(server).post('/api/posts').send({ title: 'foo' })
      expect(res.status).toBe(400)
      res = await request(server).post('/api/posts').send({ contents: 'bar' })
      expect(res.status).toBe(400)
    }, 500)
  })
  describe('4 [PUT] /api/posts/:id', () => {
    it('responds with updated user', async () => {
      const [id] = await db('posts').insert(post1)
      const updates = { title: 'xxx', contents: 'yyy' }
      const res = await request(server).put(`/api/posts/${id}`).send(updates)
      expect(res.body).toMatchObject({ id, ...updates })
    }, 500)
    it('saves the updated user to the db', async () => {
      const [id] = await db('posts').insert(post2)
      const updates = { title: 'aaa', contents: 'bbb' }
      await request(server).put(`/api/posts/${id}`).send(updates)
      let user = await db('posts').where({ id }).first()
      expect(user).toMatchObject({ id, ...updates })
    }, 500)
    it('responds with the correct message & status code on bad id', async () => {
      const updates = { title: 'xxx', contents: 'yyy' }
      const res = await request(server).put('/api/posts/foobar').send(updates)
      expect(res.status).toBe(404)
      expect(res.body.message).toMatch(/does not exist/i)
    }, 500)
    it('responds with the correct message & status code on validation problem', async () => {
      const [id] = await db('posts').insert(post2)
      let updates = { title: 'xxx' }
      let res = await request(server).put(`/api/posts/${id}`).send(updates)
      expect(res.status).toBe(400)
      expect(res.body.message).toMatch(/provide title and contents/i)
      updates = { contents: 'zzz' }
      res = await request(server).put(`/api/posts/${id}`).send(updates)
      expect(res.status).toBe(400)
      expect(res.body.message).toMatch(/provide title and contents/i)
      updates = {}
      res = await request(server).put(`/api/posts/${id}`).send(updates)
      expect(res.status).toBe(400)
      expect(res.body.message).toMatch(/provide title and contents/i)
    }, 500)
  })
  describe('5 [DELETE] /api/posts/:id', () => {
    it('reponds with a 404 if the post is not found', async () => {
      let res = await request(server).delete('/api/posts/111')
      expect(res.status).toBe(404)
      expect(res.body.message).toMatch(/does not exist/i)
    }, 500)
    it('reponds with the complete deleted post', async () => {
      await db('posts').insert(post1)
      let res = await request(server).delete('/api/posts/1')
      expect(res.body).toHaveProperty('id')
      expect(res.body).toMatchObject(post1)
    }, 500)
    it('removes the deleted post from the database', async () => {
      const [id] = await db('posts').insert(post2)
      let post = await db('posts').where({ id }).first()
      expect(post).toBeTruthy()
      await request(server).delete('/api/posts/' + id)
      post = await db('posts').where({ id }).first()
      expect(post).toBeFalsy()
    }, 500)
  })
  describe('6 [GET] /api/posts/:id/comments', () => {
    it('reponds with a 404 if the post is not found', async () => {
      let res = await request(server).get('/api/posts/66/comments')
      expect(res.status).toBe(404)
      expect(res.body.message).toMatch(/does not exist/i)
    }, 500)
    it('can get all the comments associated to the posts with given id', async () => {
      await db('posts').insert(post1)
      await db('posts').insert(post2)
      const comments = [
        { text: 'foo', post_id: 1 }, { text: 'bar', post_id: 1 }, { text: 'baz', post_id: 2 }
      ]
      await db('comments').insert(comments)
      let res = await request(server).get('/api/posts/1/comments')
      expect(res.body).toHaveLength(2)
      expect(res.body).toMatchObject([comments[0], comments[1]])
      res = await request(server).get('/api/posts/2/comments')
      expect(res.body).toHaveLength(1)
      expect(res.body).toMatchObject([comments[2]])
    }, 500)
  })
})
