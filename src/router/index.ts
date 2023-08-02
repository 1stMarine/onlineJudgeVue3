/**
 * 路由配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import Problem from '../views/problem/index.vue'
import Match from '../views/match/index.vue'
import Blog from '../views/blog/index.vue'
import BlogDetail from '../views/blog/components/BlogDetial.vue'
import Admin from '../views/admin/index.vue'
import addQuestion from '@/views/admin/components/question/addQuestion.vue'
import setting from '../views/admin/components/setting/setting.vue'
import Main from '../components/front/main.vue'
import Privacy from '../components/front/privacy.vue'
import Donation from '../components/front/donation.vue'
import problemDetialVue from '@/views/problem/problemDetial.vue'
import adminQuestionListVue from '@/views/admin/components/question/adminQuestionList.vue'
import User from '@/views/user/index.vue'
import adminMatchList from '@/views/admin/components/match/adminMatchList.vue'
import addMatch from '@/views/admin/components/match/addMatch.vue'
import setupAllRouterGuard from './listener'
import matchDetial from '@/views/match/components/matchDetial.vue'
import adminMatchManageVue from '@/views/admin/components/match/adminMatchManage.vue'
import editQuestionVue from '@/views/admin/components/question/editQuestion.vue'
import adminUserListVue from '@/views/admin/components/user/adminUserList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path:'/main',
      name:'main',
      component: Main
    },
    {
      path:'/privacy',
      name:'privacy',
      component: Privacy
    },
    {
      path:'/donation',
      name:'donation',
      component: Donation
    },
    {
      path:'/user',
      name:'user',
      component: User
    },
    {
      path: '/problem',
      name: 'problem',
      component: Problem
    },
    {
      path: '/problemDetial',
      name: 'problemDetial',
      component: problemDetialVue
    },
    {
      path: '/matchDetial',
      name: 'matchDetial',
      component: matchDetial
    },
    {
      path: '/match',
      name: 'match',
      component: Match
    },
    {
      path:'/blog/:type',
      name:'blog',
      component:Blog
    },{
      path:'/blogDetail/:bid',
      name:'blogDetail',
      component:BlogDetail
    },
    {
      path: '/admin',
      name: 'admin',
      components:{
        default:Admin
      },
      children:[
        {
          path:'setting',
          name:'setting',
          component:setting
        },
        {
          path:'addQuestion',
          name:'addQuestion',
          component:addQuestion
        },
        {
          path:'adminQuestionList',
          name:'adminQuestionList',
          component:adminQuestionListVue
        },
        {
          path:'adminMatchList',
          name:'adminMatchList',
          component:adminMatchList,
        },{
          path:'editQuestionVue',
          name:'editQuestionVue',
          component:editQuestionVue
        },
        {
          path:'addMatch',
          name:'addMatch',
          component:addMatch
        },
        {
          path:'manageMatch',
          name:'manageMatch',
          component:adminMatchManageVue
        },{
          path:'adminUserList',
          name:'adminUserList',
          component:adminUserListVue
        }
      ]
 
    }

  ]
})
setupAllRouterGuard(router)
export default router
