import Index from '../views/index.vue'

export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    // path: '/todo/:id',
    path: '/index',
    props: true,
    component: Index,
    // props: (route) => ({id: route.query.b}),
    // component: () => import('../views/todo/todo.vue'),
    // beforeEnter (to, from, next) {
    //   console.log('app route enter')
    //   next()
    // },
    name: 'index'
  }
]
