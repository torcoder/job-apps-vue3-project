import { createRouter, createWebHistory } from 'vue-router'
import Jobs from '../views/Jobs.vue'
import JobDetail from '../views/JobDetail.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Jobs,
    },
    {
      path: '/job/:id',
      name: 'job-detail',
      component: JobDetail,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
