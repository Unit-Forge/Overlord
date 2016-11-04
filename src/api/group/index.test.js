import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Group } from '.'

const app = () => express(routes)

let userSession, adminSession, group

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  group = await Group.create({})
})

test('POST /groups 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: adminSession, name: 'test', description: 'test', image: 'test', leader: 'test', assignments: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.leader).toEqual('test')
  expect(body.assignments).toEqual('test')
})

test('POST /groups 401 (user)', async () => {
  const { status } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /groups 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /groups 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /groups/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${group.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(group.id)
})

test('GET /groups/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /groups/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`/${group.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', image: 'test', leader: 'test', assignments: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(group.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.leader).toEqual('test')
  expect(body.assignments).toEqual('test')
})

test('PUT /groups/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`/${group.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /groups/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${group.id}`)
  expect(status).toBe(401)
})

test('PUT /groups/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test', image: 'test', leader: 'test', assignments: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groups/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${group.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /groups/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${group.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /groups/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${group.id}`)
  expect(status).toBe(401)
})

test('DELETE /groups/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
