const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')

const serverRender = require('./server-render.js')

const clientManifest = require('../../../public/vue-ssr-client-manifest.json')

const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const router = new Router()

router.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = router
