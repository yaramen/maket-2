export default [
  {
    path: '/',
    component: () => import("../components/pages/skills"),
    meta: {
      title: 'Блок "Обо мне"'
    }
  },
  {
    path: '/works',
    component: () => import("../components/pages/works"),
    meta: {
      title: 'Блок "Работы"'
    }
  },
  {
    path: '/reviews',
    component: () => import("../components/pages/review"),
    meta: {
      title: 'Блок "Отзывы"'
    }
  },
  // {
  //   path: '/auth',
  //   component: () => import("../components/pages/auth"),
  //   meta: {
  //     title: 'Авторизация'
  //   }
  // }
]
