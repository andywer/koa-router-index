const route = require('koa-route')
const defaultRender = require('./render')

function indexPageMiddleware (router, options = {}) {
  const {
    render = defaultRender,
    meta = {},
    excludeMethods = [ 'HEAD' ]
  } = options

  const renderedIndexPage = render(meta, router.stack, { excludeMethods })

  return route.get('/', ({ response }) => {
    response.set('Content-Type', 'text/html; charset=utf-8')
    response.body = renderedIndexPage
  })
}

module.exports = indexPageMiddleware
