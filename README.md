# koa-router-index

Middleware to generate index pages for REST API services. For usage with [koa](https://github.com/koajs/koa) v2 and [koa-router](https://github.com/alexmingoia/koa-router).

Why? Because an API service should tell you which endpoints it provides. You should never have to google the service's documentation in order to use it.


## Installation

```sh
npm install --save koa-router-index
```


## Usage

```js
const IndexPage = require('koa-router-index')

app.use(
  IndexPage(koaRouter, options /* (optional) */)
)
```

A more comprehensive example:

```js
const Koa = require('koa')
const Router = require('koa-router')
const IndexPage = require('koa-router-index')

const router = new Router()
  .get('/user/:id', userHandler)
  .get('/status', statusHandler)

const app = new Koa()
  .use(router.routes())
  .use(IndexPage(router, { meta: require('./package.json') }))
```


## Options

### render: Function (metadata: Object, routingStack: Object[], options: Object) => String

Rendering function used to create the index page. Must return an HTML document as a string.

### meta: Object

#### name: String
The name of the service.

#### description: String
A short description of the service.

### excludeMethods: String[]

Array of HTTP methods to ignore when creating the index page. Defaults to `[ 'HEAD' ]`.


## License

MIT
