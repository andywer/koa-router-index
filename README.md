# koa-router-index

[![Build Status](https://travis-ci.org/andywer/koa-router-index.svg?branch=master)](https://travis-ci.org/andywer/koa-router-index) [![NPM Version](https://img.shields.io/npm/v/koa-router-index.svg)](https://www.npmjs.com/package/koa-router-index) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Middleware to generate an index page for REST API services. For usage with [koa](https://github.com/koajs/koa) v2 and [koa-router](https://github.com/alexmingoia/koa-router).

Why? Because an API service should tell you which endpoints it provides. You should not have to google the service's documentation to be able to use it.

<p align="center">
  <img alt="Screenshot" width="600px" src="https://github.com/andywer/koa-router-index/raw/master/docs/sample-page.png?raw=true" />
</p>


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

- `name` - The name of the service.
- `description` - A short description of the service.

### excludeMethods: String[]

Array of HTTP methods to ignore when creating the index page. Defaults to `[ 'HEAD' ]`.


## License

MIT
