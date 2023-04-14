/**
 * 路由配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import Problem from '../views/problem/index.vue'
import Match from '../views/match/index.vue'
import Admin from '../views/admin/index.vue'
import addQuestion from '@/views/admin/components/addQuestion.vue'
import setting from '../views/admin/components/setting.vue'

import problemDetialVue from '@/views/problem/problemDetial.vue'
import adminQuestionListVue from '@/views/admin/components/adminQuestionList.vue'
import User from '@/views/user/index.vue'
import adminMatchList from '@/views/admin/components/adminMatchList.vue'
import addMatch from '@/views/admin/components/addMatch.vue'
import setupAllRouterGuard from './listener'
import matchDetial from '@/views/match/components/matchDetial.vue'
import adminMatchManageVue from '@/views/admin/components/adminMatchManage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/problem'
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
        }
      ]
 
    }

  ]
})
setupAllRouterGuard(router)
export default router
