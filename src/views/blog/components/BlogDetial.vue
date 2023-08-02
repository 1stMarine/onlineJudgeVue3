<template>
    <el-container>
        <el-aside width="20%">


            <el-card shadow="always" v-if="!loadBlogDone"
                style="margin-left: 5%;position: fixed; top: 140px; left: 0px;  width: 15%; z-index: 1040;">
                <el-skeleton animated />
                <br />
                <el-skeleton style="--el-skeleton-circle-size: 100px" animated>
                    <template #template>
                        <el-skeleton-item variant="circle" animated />
                    </template>
                </el-skeleton>
            </el-card>



            <!-- 侧边栏 -->
            <el-card shadow="always" v-if="loadBlogDone"
                style="margin-left: 5%;position: fixed; top: 140px; left: 0px;  width: 15%; z-index: 1040;">
                <img class="w-32 mx-auto rounded-full -mt-20 border-8 border-white" style="margin-top: 1px;" :src="userImg"
                    alt="">
                <div class="text-center mt-2 text-3xl font-medium">{{ blog?.user.nickName }}</div>
                <div class="text-center mt-2 font-light text-sm">{{ blog?.user.email }}</div>
                <div class="text-center font-normal text-lg">{{ blog?.user.school }}</div>
                <div class="px-6 text-center mt-2 font-light text-sm">
                    <p>
                        {{ blog?.user.sign }}
                    </p>
                </div>
                <hr class="mt-8">
                <div class="flex p-4">
                    <div class="w-1/2 text-center">
                        <span class="font-bold">{{ blog?.user.fans }}</span> 粉丝
                    </div>
                    <div class="w-0 border border-gray-300">

                    </div>
                    <div class="w-1/2 text-center">
                        <span class="font-bold">{{ blog?.user.subscribe }}</span> 关注
                    </div>
                </div>
            </el-card>



        </el-aside>
        <el-container style="min-height: 105vh;">
            <el-header>

            </el-header>
            <el-main>

                <!-- 帖子主体 -->
                <el-card shadow="always">
                    <!-- 面包屑导航栏 -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/blog/all' }">讨论</el-breadcrumb-item>
                        <el-breadcrumb-item><a :href="topicUrl.get(type)">{{ blog?.type }}</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a href="#">{{ blog?.title }}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-divider />

                    <!-- 加载动态 -->
                    <el-skeleton style="width: 100%" v-if="!loadBlogDone">
                        <template #template>
                            <el-skeleton-item variant="image" style="width: 100%; height: 20%" />
                            <div style="padding: 14px">
                                <el-skeleton-item variant="p" style="width: 100%" />

                                <el-skeleton :rows="5" animated />
                                <el-skeleton-item variant="text" style="margin-right: 16px" />
                                <el-skeleton-item variant="text" style="width: 30%" />
                            </div>

                        </template>
                    </el-skeleton>

                    <!-- 加载完成主体 -->
                    <div v-if="loadBlogDone">
                        <!-- 帖子信息头部 -->
                        <div class="mb-0 md:mb-0 w-full max-w-screen-lg mx-auto relative" style="height: 24em;">

                            <div class="absolute left-0 bottom-0 w-full h-full z-10"
                                style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"></div>

                            <img :src="blog?.faceImage" class="absolute left-0 top-0 w-full h-full z-0 object-cover" />
                            <!-- 关注按钮 -->
                            <div class="p-4 absolute bottom-0 left-0 z-20">
                                <a href="#" @click="subscribeChoice" 
                                    :class="subscribeClass">{{ subscribeValue }}</a>
                                <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
                                    <!-- 标题 -->

                                    {{ blog?.title }}
                                    <!-- 管理员标签 -->
                                    <el-tag v-for="admintag in blog?.adminTags" :type="admintag.type" class="mx-1"
                                        effect="dark">{{ admintag.message }}</el-tag>
                                </h2>
                                <div class="flex mt-3">
                                    <!-- 头像 -->
                                    <img :src="userImg" class="h-10 w-10 rounded-full mr-2 object-cover" />
                                    <div>
                                        <p class="font-semibold text-gray-200 text-sm">{{ blog?.user.nickName }}</p>
                                        <p class="font-semibold text-gray-400 text-xs">{{ blog?.time }}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="mb-0 md:mb-0 w-full max-w-screen-lg mx-auto relative">
                            <el-link :href="topicUrl.get(type)" type="primary">话题：{{ topic.get(type) }}</el-link>
                        </div>
                        <el-divider />
                        <!-- 帖子内容 -->
                        <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-lg mx-auto text-lg leading-relaxed">
                            <v-md-editor v-model="markdown" mode="preview"></v-md-editor>
                        </div>
                        <!-- 帖子底部信息 -->
                        <hr />
                        <div>
                            <!-- 喜欢 -->
                            <div class="cursor-pointer text-center text-md justify-center items-center flex "
                                style="float: left;margin: 30px 10px 20px 0px;" @click="addLike"
                                @mouseleave="likeColor = likeMouseLeave" @mouseenter="likeColor = likeMouseEnter">
                                <icon-thumbs-up theme="two-tone" size="20" :fill="likeColor" />
                                <span class="text-md mx-1" :style="{ color: likeColor[0] }">{{ blog?.like }}</span>
                            </div>
                            <!-- 收藏 -->
                            <div class="cursor-pointer text-center text-md justify-center items-center flex "
                                style="float: left;margin: 30px 10px 20px 0px;" @click="addStar"
                                @mouseleave="starColor = starMouseLeave" @mouseenter="starColor = starMouseEnter">
                                <icon-star theme="two-tone" size="20" :fill="starColor" />
                                <span class="text-md mx-1" :style="{ color: starColor[0] }">{{ blog?.star }}</span>
                            </div>
                            <!-- 删除 -->
                            <div v-show="userStore().$state.user.id == blog?.user.id" @click="removeBlog"
                                class="cursor-pointer text-center text-md justify-center items-center flex "
                                style="float: left;margin: 33px 10px 20px 0px;"
                                @mouseleave="deleteColor = ['#9b9b9b', '#ffffff']"
                                @mouseenter="deleteColor = ['#d0021b', '#ffffff']">
                                <icon-delete theme="two-tone" size="19" :fill="deleteColor" />
                                <span class="text-md mx-1" :style="{ color: starColor[0] }">{{ }}</span>
                            </div>
                            <!-- 分享 -->
                            <div class="cursor-pointer text-center text-md justify-center items-center flex "
                                style="float: left;margin: 30px 20px 20px 0px;"
                                @mouseleave="shareColor = ['#9b9b9b', '#ffffff']"
                                @mouseenter="shareColor = ['#4a90e2', '#ffffff']" @click="copyShareUrl">
                                <icon-share-two style="margin-top: 3px;" theme="two-tone" size="20" :fill="shareColor" />
                            </div>

                            <!-- 回复评论 -->
                            <button @click="openCommentsEdit"
                                class="group rounded-2xl h-12 w-40 bg-green-500 font-bold text-lg text-white relative overflow-hidden"
                                style="float: right;margin: 20px 20px 20px 20px;">
                                回复评论
                                <div
                                    class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl">
                                </div>
                            </button>
                            <!-- 修改 -->
                            <div class="cursor-pointer text-center text-md justify-center items-center flex "
                                style="float: right;margin: 30px 10px 20px 0px;"
                                @mouseleave="editColor = ['#9b9b9b', '#ffffff']"
                                @mouseenter="editColor = ['#303133', '#ffffff']" @click="editChangeOpen = true">
                                <icon-edit style="margin-top: 3px;" theme="two-tone" size="25" :fill="editColor" />
                            </div>
                        </div>
                    </div>

                </el-card>
                <!-- 评论卡片 -->
                <commentsCard v-for="comments in commentsList" :comments="comments" :bid="blog?.id" />
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
        <el-aside width="20%">

            <el-card shadow="always" v-if="!loadBlogDone"
                style="margin-right: 5%;position: fixed; top: 140px; right: 0px;  width: 15%; z-index: 1040;">
                <div>
                    <el-skeleton :rows="3" animated />
                </div>
                <el-divider />
                <div style="margin-top: 10px;">
                    <span style="color: gray;">相关标签</span> <br /><br />
                    <el-skeleton :rows="1" animated />
                </div>
            </el-card>

            <!-- 侧边栏 -->
            <el-card shadow="always" v-if="loadBlogDone"
                style="margin-right: 5%;position: fixed; top: 140px; right: 0px;  width: 15%; z-index: 1040;">
                <div>
                    <span style="color: gray;">收藏次数</span>
                    <el-tag class="ml-2" type="info" style="float: right;">{{ blog?.star }}</el-tag>
                </div>
                <div style="margin-top: 10px;">
                    <span style="color: gray;">评论次数</span>
                    <el-tag class="ml-2" type="info" style="float: right;">{{ blog?.comment }}</el-tag>
                </div>
                <div style="margin-top: 10px;">
                    <span style="color: gray;">点赞次数</span>
                    <el-tag class="ml-2" type="info" style="float: right;">{{ blog?.like }}</el-tag>
                </div>
                <el-divider />
                <div style="margin-top: 10px;">
                    <span style="color: gray;">相关标签</span> <br /><br />
                    <!-- 管理员标签 -->
                    <el-tag v-for="admintag in blog?.adminTags" :type="admintag.type" class="mx-1" effect="dark">{{
                        admintag.message }}</el-tag>
                    <el-tag class="mx-1" type="info" v-for="tag in tags" round>{{ tag }}</el-tag>
                </div>
            </el-card>
        </el-aside>
    </el-container>

    <!-- 评论回复弹出框 -->
    <el-drawer v-model="openEditer" title="I am the title" :with-header="false" direction="btt" size="80%">
        <h2 class="mb-4 text-2xl font-bold" style="float: left;width: 100%;">回复评论</h2>
        <!-- markdown编辑器 -->
        <v-md-editor v-model="comments.context" height="80%" :disabled-menus="[]"
            @upload-image="handleUploadImage"></v-md-editor>
        <!-- 发布按钮 -->
        <button type="button" style="float: right;" publishBlog @click="sendComments"
            class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
            发 &nbsp;&nbsp; 布 <icon-writing-fluently theme="outline" size="24" :fill="['#ffffff', '#7ed321']"
                style="float: right;margin-left: 5px;" />
        </button>
    </el-drawer>
    <!-- 修改弹出框 -->
    <el-drawer v-model="editChangeOpen" title="I am the title" :with-header="false" direction="btt" size="80%">
        <MarkdownRenderer type="change" :blog="blog" />
    </el-drawer>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'

import API from '@/plugins/axiosInstance';
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import type { Blog, Comments } from '@/lib/types'
import useClipboard from "vue-clipboard3";
import { userStore } from '@/store';
import commentsCard from './commentsCard.vue'
import MarkdownRenderer from '@/components/front/MarkdownRenderer.vue'

const { toClipboard } = useClipboard();
const { params } = useRoute()
const router = useRouter()
const bid = params.bid
const blog = ref<null | Blog>(null)
const markdown = ref("")
const userImg = ref("")
const type = ref("#all")
const loadBlogDone = ref(false)
const openEditer = ref(false)
const editChangeOpen = ref(false)
const commentsList = ref<any>([])
const shareColor = ref(['#9b9b9b', '#ffffff'])


// 关注状态
const subscribeValue = ref("关注")
const subscribeState = ref(false)
const subscribeClass = ref("px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2 hover:bg-gray-500")
const subscribedClass = ref("px-4 py-1 bg-black text-gray-600 inline-flex items-center justify-center mb-2 hover:bg-gray-200")
const unSubscribeClass = ref("px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2 hover:bg-gray-500")

// 喜欢状态
const likeMouseEnter = ref(['#67C23A', '#ffffff'])
const likeMouseLeave = ref(['#9b9b9b', '#ffffff'])
const likeColor = ref(['#9b9b9b', '#ffffff'])

// 收藏状态
const starMouseEnter = ref(['#f5a623', '#ffffff'])
const starMouseLeave = ref(['#9b9b9b', '#ffffff'])
const starColor = ref(['#9b9b9b', '#ffffff'])

// 删除状态
const deleteColor = ref(['#9b9b9b', '#ffffff'])

// 编辑状态
const editColor = ref(['#9b9b9b', '#ffffff'])

let comments = reactive<Comments>({
    id: "",
    bid: "000",
    blogUid: "000",
    commentsUid: "000",
    time: "",
    context: "",
    commentsContext: "",
    like: 0,
    star: 0,
    commentsUser: null,
    user: null,
    likeState: 0
})
const subscribeChoice = () => {
    if(subscribeState.value){
        unSubscribe()
    }else{
        subscribe()
    }
}

const unSubscribe = () => {
    if (userStore().$state.isLogin) {
        API({
            url: '/unSubscribe/' + blog.value?.user.id + "/" + userStore().$state.user.id,
            method: 'get'
        }).then((res) => {
            ElMessage({
                message: res.data.message,
                type: 'success'
            })
            location.reload()
        })
    }else{
        ElMessage.error("请先登录！")
    }

}
const subscribe = () => {
    if (userStore().$state.isLogin) {
        API({
            url: '/subscribe/' + blog.value?.user.id + "/" + userStore().$state.user.id,
            method: 'get'
        }).then((res) => {
            ElMessage({
                message: res.data.message,
                type: 'success'
            })
            location.reload()
        })
    }else{
        ElMessage.error("请先登录！")
    }

}
// 未登录 和 登录后得到帖子的详细内容
let getBlogDetialUrl = userStore().$state.isLogin ?
    '/queryBlog/' + userStore().$state.user.id + "/" + bid :
    '/queryBlog/0/' + bid

API({
    url: getBlogDetialUrl,
    method: 'get'
}).then((res) => {

    blog.value = res.data.data
    markdown.value = res.data.data.context
    userImg.value = res.data.data.user.url
    type.value = res.data.data.type
    blog.value!.adminTags = JSON.parse(blog.value?.adminTags)
    if (typeof res.data.data.tag != 'object') {
        tags.value = JSON.parse(res.data.data.tag)
    }
    // 初始化收藏状态
    if (blog.value?.starState == 1) {
        let starTempColor = starMouseEnter.value
        starMouseEnter.value = starMouseLeave.value
        starMouseLeave.value = starTempColor
        starColor.value = ['#f5a623', '#ffffff']
    }
    // 初始化喜欢状态
    if (blog.value?.likeState == 1) {
        let likeTempColor = likeMouseEnter.value
        likeMouseEnter.value = likeMouseLeave.value
        likeMouseLeave.value = likeTempColor
        likeColor.value = ['#67C23A', '#ffffff']
    }
    // 初始化关注状态
    if(blog.value?.subscribeState == 1){
        subscribeValue.value = "已关注"
        subscribeState.value = true
        subscribeClass.value = subscribedClass.value
    }
    getCommentsList()
})
/**
 * markdown中插入图片
 * @param event 
 * @param insertImage 
 * @param files 
 */
const handleUploadImage = (event: any, insertImage: any, files: File[]) => {
    let formData: any = new FormData()
    formData.append('file', files[0])
    console.log(files[0]);


    API({
        url: '/uploadImg',
        data: formData,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res) => {
        console.log(res);
        insertImage({
            url: res.data
        })
    })

}

const topic = new Map([
    ["#all", "#全部"],
    ["#other", "#其他闲聊"],
    ["#question", "#题解讨论"],
    ["#technology", "#技术杂谈"],
])
const topicUrl = new Map([
    ["#all", "/blog/all"],
    ["#other", "/blog/other"],
    ["#question", "/blog/question"],
    ["#technology", "/blog/technology"],
])

const removeBlog = () => {
    API({
        url: '/removeBlog/' + blog.value?.id,
        method: 'get'
    }).then((res) => {
        if (res.data.state == 40001) {
            ElMessage({
                message: res.data.message,
                type: 'success'
            })
            router.push('/blog/all')
        } else {
            ElMessage.error(res.data.message)
        }
    })
}
// 打开回复评论窗口
const openCommentsEdit = () => {
    if (userStore().$state.isLogin == false) {
        ElMessage.error("未登录")
        return 0;
    } else {
        openEditer.value = true
    }
}
// 得到评论列表
const getCommentsList = () => {
    let getCommentsUrl = userStore().$state.isLogin ?
        '/getCommentsList/' + blog.value?.id + "/" + userStore().$state.user.id :
        '/getCommentsList/' + blog.value?.id + "/0"
    API({
        url: getCommentsUrl,
        method: 'get'
    }).then((res) => {
        console.log("commentsList", res.data);
        commentsList.value = res.data.data
        loadBlogDone.value = true
    }).catch(err => {
        ElMessage.error("服务器除了一点小问题,稍后再试~")
    })
}
// 赞
const addLike = () => {
    let state = blog.value?.likeState == 1 ? 0 : 1
    API({
        url: '/likeBlog/' + userStore().$state.user.id + '/' + blog.value?.id + "/" + state,
        method: 'get'
    }).then((res) => {
        ElMessage({
            message: res.data.message,
            type: 'success',
        })
        let likeTempColor = likeMouseEnter.value
        likeMouseEnter.value = likeMouseLeave.value
        likeMouseLeave.value = likeTempColor

        if (blog.value?.likeState == 1) {
            blog.value!.like -= 1
            blog.value!.likeState = 0
            likeColor.value = ['#9b9b9b', '#ffffff']
        } else {
            blog.value!.like += 1
            blog.value!.likeState = 1
            likeColor.value = ['#67C23A', '#ffffff']
        }
    }).catch(err => {
        ElMessage.error("服务器发生了一些错误")
    })
}
// 收藏
const addStar = () => {
    let state = blog.value?.starState == 1 ? 0 : 1
    API({
        url: '/starBlog/' + userStore().$state.user.id + '/' + blog.value?.id + "/" + state,
        method: 'get'
    }).then((res) => {
        ElMessage({
            message: res.data.message,
            type: 'success',
        })
        let starTempColor = starMouseEnter.value
        starMouseEnter.value = starMouseLeave.value
        starMouseLeave.value = starTempColor

        if (blog.value?.starState == 1) {
            blog.value!.star -= 1
            blog.value!.starState = 0
            starColor.value = ['#9b9b9b', '#ffffff']
        } else {
            blog.value!.star += 1
            blog.value!.starState = 1
            starColor.value = ['#f5a623', '#ffffff']
        }
    }).catch(err => {
        ElMessage.error("服务器发生了一些错误")
    })
}
// 发送评论
const sendComments = () => {
    comments.bid = blog.value!.id
    comments.blogUid = blog.value!.user.id
    comments.commentsUid = userStore().$state.user.id
    comments.commentsContext = markdown.value
    API({
        url: '/addComments',
        method: 'post',
        data: comments
    }).then((res) => {
        ElMessage({
            message: '回复成功.',
            type: 'success',
        })
        location.reload()
        openEditer.value = !openEditer.value
    }).catch(err => {
        ElMessage.error("服务器除了一点小问题,稍后再试~")
    })
}

let tags = ref([])




// 分享链接
const copyShareUrl = async () => {
    try {
        await toClipboard(window.location.href);
        ElMessage({
            message: '链接复制成功.',
            type: 'success',
        })
    } catch (e) {
        ElMessage.error('链接复制失败.')
    }


}




</script>