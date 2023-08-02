<template>
	<div class="p-4 items-center justify-center w-full rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl md:flex"
		style="margin-bottom: 10px;height: 250px;">
		<!-- 封面图 -->
		<img class="mx-auto w-full block w-3/12 h-full rounded-lg md:flex" alt="art cover" loading="lazy"
			style="width: 100%;height: 100%;object-fit: cover;" :src='blog.faceImage' />
		<div class="sm:w-8/12 pl-0 p-5">
			<div class="space-y-2">
				<!-- 标题 -->
				<div class="space-y-4">
					<a :href="toBlogDetialUrl" class="text-md font-semibold text-cyan-900 text-justify">
						{{ blog.title }}
					</a>
					<!-- 管理员标签 -->
					<el-tag v-for="admintag in blog.adminTags" :type="admintag.type" class="mx-1" effect="dark">{{ admintag.message }}</el-tag>
				</div>
				<!-- 普通用户标签 -->
				<div>
					<el-tag class="mx-1" type="info" v-for="tag in tags" round>{{ tag }}</el-tag>
				</div>
				<!-- 文字介绍 -->

				<el-text class="mx-1" type="info">
					<a :href="toBlogDetialUrl" class="text-md font-semibold text-cyan-900 text-justify">{{
						blog.context.slice(0, 35) + '......' }}</a>

				</el-text>
				<div class="flex items-center space-x-4 justify-between">
					<div class="flex gap-3 space-y-1">
						<!-- 头像 -->
						<img :src="blogUser.url" class="rounded-full h-8 w-8" />
						<!-- 用户名 -->
						<span class="text-sm">{{ blogUser.nickName }}</span>
					</div>
					<div class=" px-3 py-1 rounded-lg flex space-x-2 flex-row">
						<!-- 收藏 -->
						<div class="cursor-pointer text-center text-md justify-center items-center flex " @click="addStar"
							@mouseleave="starColor = starMouseLeave" @mouseenter="starColor = starMouseEnter">
							<icon-star theme="two-tone" size="20" :fill="starColor" />
							<span class="text-md mx-1" :style="{ color: starColor[0] }">{{ blog.star }}</span>
						</div>
						<!-- 评论数 -->
						<div class="cursor-pointer text-center text-md justify-center items-center flex"
							@mouseleave="commentColor = ['#9b9b9b', '#ffffff']"
							@mouseenter="commentColor = ['#4a90e2', '#ffffff']">
							<icon-comment theme="two-tone" size="20" :fill="commentColor" />
							<span class="text-md mx-1" :style="{ color: commentColor[0] }">{{ blog.comment }}</span>
						</div>

					</div>
				</div>
				<!-- 发布时间 -->
				<div class="flex items-center space-x-4 justify-between">
					<div class="text-grey-500 flex flex-row space-x-1  my-4">
						<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em"
							xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<p class="text-xs">{{ calculateTime() }}</p>
					</div>
					<div class="flex flex-row space-x-1">

						<!-- 点赞 -->
						<div :class="likeClass" @click="addLike">
							<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
								class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z">
								</path>
							</svg>
							<span>{{ blog.like }}</span>
						</div>
					</div>

				</div>
				<div>
					<el-link :href="topicUrl.get(blog.type)" type="primary">话题：{{ topic.get(blog.type) }}</el-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import API from '@/plugins/axiosInstance';
import { ElMessage } from 'element-plus'
import { userStore } from '@/store';
import type { Blog,AdminTag } from '@/lib/types'
import router from '@/router';
const props = defineProps(['blog'])
const blog:Blog = props.blog
console.log('blog',blog);

const deleteColor = ref(['#9b9b9b', '#ffffff'])
const toBlogDetialUrl = ref('/BlogDetail/' + blog.id)
const user = userStore().$state.user
const blogUser = blog.user
// 点赞按键点赞后class
const likedClass = ref('bg-green-600 shadow-lg shadow- shadow-green-700 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row hover:bg-green-500')
// 点赞按键点攒前class
const unLikeClass = ref('bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row hover:bg-green-600')
let likeClass = blog.likeState == 1 ? likedClass.value : unLikeClass.value
// 收藏状态
const starMouseEnter = ref(['#f5a623', '#ffffff'])
const starMouseLeave = ref(['#9b9b9b', '#ffffff'])
const starColor = ref(['#9b9b9b', '#ffffff'])
if (blog.starState == 1) {
	let starTempColor = starMouseEnter.value
	starMouseEnter.value = starMouseLeave.value
	starMouseLeave.value = starTempColor
	starColor.value = ['#f5a623', '#ffffff']
}
console.log("ddd",blog.adminTags);

blog.adminTags = blog.adminTags == null ? [] : JSON.parse(blog.adminTags)
// const admintags:AdminTag[] = reactive([
// 	{
// 		message:'置顶',
// 		type:''
// 	},{
// 		message:'推荐',
// 		type:'warning'
// 	},{
// 		message:'官方',
// 		type:'success'
// 	}
// ])
// const jsonTags = JSON.stringify(admintags)
// console.log(jsonTags);
// const admintags2:AdminTag[] = reactive(JSON.parse(jsonTags))
// console.log("222",admintags2);




let tags = ref([])
const commentColor = ref(['#9b9b9b', '#ffffff'])
const topicUrl = new Map([
	["#all", "/blog/all"],
	["#other", "/blog/other"],
	["#question", "/blog/question"],
	["#technology", "/blog/technology"],
])

const topic = new Map([
	["#all", "#全部"],
	["#other", "#其他闲聊"],
	["#question", "#题解讨论"],
	["#technology", "#技术杂谈"],
])
if (typeof blog.tag != 'object') {
	tags = JSON.parse(blog.tag)
}
// 赞
const addLike = () => {
	let state = blog.likeState == 1 ? 0 : 1
	API({
		url: '/likeBlog/' + user.id + '/' + blog.id + "/" + state,
		method: 'get'
	}).then((res) => {
		ElMessage({
			message: res.data.message,
			type: 'success',
		})
		if (blog.likeState == 1) {
			blog.like -= 1
			blog.likeState = 0
			likeClass = unLikeClass.value
		} else {
			blog.like += 1
			blog.likeState = 1
			likeClass = likedClass.value
		}
	}).catch(err => {
		ElMessage.error("服务器发生了一些错误")
	})
}
// 收藏
const addStar = () => {
	let state = blog.starState == 1 ? 0 : 1
	API({
		url: '/starBlog/' + user.id + '/' + blog.id + "/" + state,
		method: 'get'
	}).then((res) => {
		ElMessage({
			message: res.data.message,
			type: 'success',
		})
		let starTempColor = starMouseEnter.value
		starMouseEnter.value = starMouseLeave.value
		starMouseLeave.value = starTempColor

		if (blog.starState == 1) {
			blog.star -= 1
			blog.starState = 0
			starColor.value = ['#9b9b9b', '#ffffff']
		} else {
			blog.star += 1
			blog.starState = 1
			starColor.value = ['#f5a623', '#ffffff']
		}
	}).catch(err => {
		ElMessage.error("服务器发生了一些错误")
	})
}
const calculateTime = () => {
	const postTime = new Date(blog.time)
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
		return blog.time;
	}
}



</script>