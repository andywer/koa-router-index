import test from 'ava'
import cheerio from 'cheerio'
import http from 'http'
import Koa from 'koa'
import Router from 'koa-router'
import request from 'supertest'
import index from '../lib/index'

test('create an index for a router', async t => {
  const router = new Router()
    .get('/users')
    .get('/posts')
    .get('/posts/:id')
    .post('/posts/:id')
    .put('/posts/:id')
    .delete('/posts/:id')

  const response = await request(createServer(router))
    .get('/')
    .expect(200)

  const $ = cheerio.load(response.text)
  const listItems = $('ul > li').get()

  t.is($('h2').text(), 'Routes')
  t.is($('ul').length, 1)

  t.is($(listItems[0]).text(), 'GET /users')
  t.is($(listItems[1]).text(), 'GET /posts')
  t.is($(listItems[2]).text(), 'GET|POST|PUT|DELETE /posts/:id')
  t.is(listItems.length, 3)
})

test.todo('create an index with metadata')
test.todo('create an index for a router with sub-routers')
test.todo('can respond with HTML')
test.todo('can respond with customized HTML')
test.todo('can respond with JSON')

function createServer (router) {
  const app = new Koa()
    .use(index(router))
    .use(router.routes())

  return http.createServer(app.callback())
}
