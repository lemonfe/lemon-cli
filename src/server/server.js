const Koa = require('koa')
const send = require('koa-send')
const path = require('path')

const app = new Koa()

const staticRouter = require('./routers/static.js')

const isDev = process.env.NODE_ENV === 'development'

// 记录所有请求以及出现的错误信息
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../../')})
  } else {
    await next()
  }
})

// 处理静态资源
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/ssr.dev.js')
} else {
  pageRouter = require('./routers/ssr.build.js')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is running on ${HOST}:${PORT}`)
})
