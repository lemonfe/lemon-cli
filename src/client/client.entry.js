import createApp from './app.js'

const {app, router} = createApp()

router.onReady(() => {
  app.$mount('#root')
})
