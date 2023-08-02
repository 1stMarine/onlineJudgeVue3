<template>
    <el-card shadow="always" style="margin-top: 10px;">
        <div class="flex gap-3 space-y-1">
            <!-- 头像 -->
            <img :src="comments.commentsUser.url" class="rounded-full h-8 w-8" />
            <!-- 用户名 -->
            <span class="text-sm">{{ comments.commentsUser.nickName }}</span>
            <!-- 时间 -->
            <div class="text-grey-500 flex flex-row space-x-1 my-4 float-right">
                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-xs">{{ calculateTime() }}</p>
            </div>
        </div>
        <!-- 评论详情信息 -->
        <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-lg mx-auto text-lg leading-relaxed">
            <el-link type="primary">回复 @{{ comments.user.nickName }}</el-link>
            <el-card shadow="hover" style="margin-top: 10px;">
                <!-- 头像 -->
                <img :src="comments.user.url" class="rounded-full h-8 w-8" />
                <v-md-editor v-model="comments.context" mode="preview"></v-md-editor>
            </el-card>

            <v-md-editor v-model="comments.commentsContext" mode="preview"></v-md-editor>
        </div>
        <!-- 帖子底部信息 -->
        <hr />
        <div>
            <!-- 喜欢 -->
            <div class="cursor-pointer text-center text-md justify-center items-center flex "
                style="float: left;margin: 30px 10px 20px 0px;" @click="addLike" @mouseleave="likeColor = likeMouseLeave"
                @mouseenter="likeColor = likeMouseEnter">
                <icon-thumbs-up theme="two-tone" size="20" :fill="likeColor" />
                <span class="text-md mx-1" :style="{ color: likeColor[0] }">{{ comments?.like }}</span>
            </div>
            <!-- 收藏
            <div class="cursor-pointer text-center text-md justify-center items-center flex "
                style="float: left;margin: 30px 10px 20px 0px;" @mouseleave="starColor = ['#9b9b9b', '#ffffff']"
                @mouseenter="starColor = ['#f5a623', '#ffffff']">
                <icon-star theme="two-tone" size="20" :fill="starColor" />
                <span class="text-md mx-1" :style="{ color: starColor[0] }">{{ comments?.star }}</span>
            </div> -->
            <!-- 删除 -->
            <div v-show="userStore().$state.user.id == comments.commentsUid" @click="removeComments"
                class="cursor-pointer text-center text-md justify-center items-center flex "
                style="float: left;margin: 31px 10px 20px 0px;" @mouseleave="deleteColor = ['#9b9b9b', '#ffffff']"
                @mouseenter="deleteColor = ['#d0021b', '#ffffff']">
                <icon-delete theme="two-tone" size="20" :fill="deleteColor" />
            </div>
            <!-- 回复
            <div class="cursor-pointer text-center text-md justify-center items-center flex " @click="openCommentsEdit"
                style="float: left;margin: 30px 10px 20px 0px;" @mouseleave="shareColor = ['#9b9b9b', '#ffffff']"
                @mouseenter="shareColor = ['#4a90e2', '#ffffff']">
                <icon-comment style="margin-top: 3px;" theme="two-tone" size="20" :fill="shareColor" />
            </div> -->

            <!-- 回复评论 -->
            <button type="button" style="float: right;" publishBlog @click="openCommentsEdit"
                @mouseleave="commentsColor = ['#6b7280', '#ffffff']" @mouseenter="commentsColor = ['#e5e7eb', '#ffffff']"
                class="text-gray-500 rounded-md px-4 py-2 m-2 transition font-bold duration-500 ease select-none hover:text-gray-200 focus:outline-none focus:shadow-outline">
                回&nbsp;&nbsp; 复 <icon-writing-fluently theme="outline" size="24" :fill="commentsColor"
                    style="float: right;margin-left: 5px;" />
            </button>
        </div>

        <!-- 评论回复弹出框 -->
        <el-drawer v-model="openEditer" title="I am the title" :with-header="false" direction="btt" size="80%">
            <h2 class="mb-4 text-2xl font-bold" style="float: left;width: 100%;">回复@{{ comments.commentsUser.nickName }}
            </h2>
            <!-- markdown编辑器 -->
            <v-md-editor v-model="commentsC.context" height="80%" :disabled-menus="[]"
                @upload-image="handleUploadImage"></v-md-editor>
            <!-- 发布按钮 -->
            <button type="button" style="float: right;" publishBlog @click="sendComments"
                class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                发 &nbsp;&nbsp; 布 <icon-writing-fluently theme="outline" size="24" :fill="['#ffffff', '#7ed321']"
                    style="float: right;margin-left: 5px;" />
            </button>
        </el-drawer>
    </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { Comments } from '@/lib/types'
import { ElNotification } from 'element-plus'
import { userStore } from '@/store';
import API from '@/plugins/axiosInstance';
import { ElMessage } from 'element-plus'
const props = defineProps(['comments','bid'])
const comments: Comments = props.comments
const deleteColor = ref(['#9b9b9b', '#ffffff'])

// 喜欢状态
const likeMouseEnter = ref(['#67C23A', '#ffffff'])
const likeMouseLeave = ref(['#9b9b9b', '#ffffff'])
let likeColor = ref(['#9b9b9b', '#ffffff'])

if (comments.likeState == 1) {
    let likeTempColor = likeMouseEnter.value
    likeMouseEnter.value = likeMouseLeave.value
    likeMouseLeave.value = likeTempColor
    likeColor = ref(['#67C23A', '#ffffff'])
}

const shareColor = ref(['#9b9b9b', '#ffffff'])
const commentsColor = ref(['#6b7280', '#ffffff'])
const openEditer = ref(false)
// 评论中的评论
let commentsC = reactive<Comments>({
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
// 打开回复评论窗口
const openCommentsEdit = () => {
    if (userStore().$state.isLogin == false) {
        ElNotification({
            title: "请求被拒绝!",
            message: "未登录!",
            type: 'error',
        })
        return 0;
    } else {
        openEditer.value = true
    }
}
// 赞
const addLike = () => {

    let state = comments.likeState == 1 ? 0 : 1
    API({
        url: '/likeComments/' + userStore().$state.user.id + '/' + comments.id + "/" + state,
        method: 'get'
    }).then((res) => {
        ElMessage({
            message: res.data.message,
            type: 'success',
        })
        let likeTempColor = likeMouseEnter.value
        likeMouseEnter.value = likeMouseLeave.value
        likeMouseLeave.value = likeTempColor

        if (comments.likeState == 1) {
            comments.like -= 1
            comments.likeState = 0
            likeColor.value = ['#9b9b9b', '#ffffff']
        } else {
            comments.like += 1
            comments.likeState = 1
            likeColor.value = ['#67C23A', '#ffffff']
        }
    }).catch(err => {
        ElMessage.error("服务器发生了一些错误")
    })
}

// 删除评论
const removeComments = () => {
    API({
        url: '/removeComments/' + comments.id + "/" + props.bid,
        method: 'get'
    }).then((res) => {
        if (res.data.state == 40001) {
            ElMessage({
                message: res.data.message,
                type: 'success'
            })
            location.reload()
        }else{
            ElMessage.error(res.data.message)
        }

    })
}

// markdown上传图片
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

// 发送评论
const sendComments = () => {

    commentsC.bid = comments.bid
    commentsC.blogUid = comments.commentsUid
    commentsC.commentsUid = userStore().$state.user.id
    commentsC.commentsContext = comments.commentsContext

    API({
        url: '/addComments',
        method: 'post',
        data: commentsC
    }).then((res) => {
        ElMessage({
            message: '回复成功.',
            type: 'success',
        })
    }).catch(err => {
        ElMessage.error("服务器除了一点小问题,稍后再试~")
    })
}

const calculateTime = () => {
    const postTime = new Date(comments.time)
    // 当前时间
    const nowDate = new Date();
    const ONE_MINUTE = 60 * 1000;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;
    const ONE_WEEK = 7 * ONE_DAY;

    const now = new Date().getTime();
    const postDate = new Date(postTime).getTime();
    const diff = now - postDate;

    if (diff < ONE_HOUR) {
        const minutes = Math.floor(diff / ONE_MINUTE);
        return `${minutes} 分钟前`;
    } else if (diff < ONE_DAY) {
        const hours = Math.floor(diff / ONE_HOUR);
        return `${hours} 小时前`;
    } else if (diff < ONE_WEEK) {
        const days = Math.floor(diff / ONE_DAY);
        return `${days} 天前`;
    } else {
        return comments.time;
    }
}
</script>