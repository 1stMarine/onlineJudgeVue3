/*
 * @Description:
 * @Version: 2.0
 * @Author: AICHEN
 * @Date: 2022-11-04 21:55:15
 * @LastEditors: AICHEN
 * @LastEditTime: 2023-01-30 21:49:22
 */
import { userStore } from '@/store';
import type { Router, LocationQueryRaw } from 'vue-router';
import { ElNotification } from 'element-plus'
// 白名单,无需登录
const whiteList = [
        "problem",
        "match",
        "problemDetial",
        "getMatchList",
        "matchDetial"
]

const adminList = [
        "setting",
        "addQuestion",
        "adminQuestionList",
        "admin",
        "addMatch",
        "adminMatchList",
        "manageMatch"
]

// 此处负责登录的路由拦截
export default function setupAllRouterGuard(router: Router) {

	router.beforeEach(async (to, from, next) => {
              
        if(whiteList.indexOf(to.name) != -1){
                // 没登陆，但是白名单
                
                next()
                return;
        }

        if(userStore().$state.isLogin){
                // 访问的是管理页面
                if(adminList.indexOf(to.name) != -1 && userStore().$state.isAdmin){
                        next()
                }else if(adminList.indexOf(to.name) != -1 && !userStore().$state.isAdmin){
                        ElNotification({
                                title: "嗨嗨嗨",
                                message: "小朋友不可以学坏坏",
                                type: 'error',
                        })
                        // 不是管理
                        next({
                                path:'/problem'
                                
                        })
                }else if(adminList.indexOf(to.name) == -1){
                        
                        next()
                }
        }else{
                
                ElNotification({
                        title: "警告",
                        message: "没登陆?看啥呢",
                        type: 'error',
                })
                // 不是管理
                next({
                        path:'/problem'
                }) 
        }

        
        
        
	});
}
