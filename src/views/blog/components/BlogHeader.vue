<template>
    <div class="flex flex-col">

        <div>
            <img src="../../../../public/logo.png" width="50" height="50"/>
            <h2 class="mb-4 text-2xl font-bold" style="float: left;">CodeSky讨论区</h2>
            <!-- 发布讨论 -->
            <button @click="openEditer = true"
                class="group rounded-2xl h-12 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden"
                style="float: right;">


                发布讨论

                <div
                    class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl">
                </div>
            </button>



        </div>
        <!-- 讨论快速分类 -->
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" >
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg hover:bg-gray-100" style="cursor: pointer;" @click="router.push('/blog/all')">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                </div>

                <div class="ml-4">
                    <h2 class="font-semibold">全部讨论</h2>
                    <p class="mt-2 text-sm text-gray-500">问题讨论，促进合作</p>
                </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg hover:bg-gray-100" style="cursor: pointer;" @click="router.push('/blog/question')">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div class="ml-4">
                    <h2 class="font-semibold">题解讨论</h2>
                    <p class="mt-2 text-sm text-gray-500">题解讨论，分享思路</p>
                </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg hover:bg-gray-100" style="cursor: pointer;" @click="router.push('/blog/technology')">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>

                <div class="ml-4">
                    <h2 class="font-semibold">技术杂谈</h2>
                    <p class="mt-2 text-sm text-gray-500">技术交流，互相帮助</p>
                </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg hover:bg-gray-100" style="cursor: pointer;" @click="router.push('/blog/other')">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                </div>

                <div class="ml-4">
                    <h2 class="font-semibold">其他闲谈</h2>
                    <p class="mt-2 text-sm text-gray-500">闲话家常，欢乐交流</p>
                </div>
            </div>
        </div>

    </div>

    <!-- 讨论区发布 -->
    <el-drawer v-model="openEditer" title="I am the title" :with-header="false" direction="btt" size="80%">
        <MarkdownRenderer />
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MarkdownRenderer from '@/components/front/MarkdownRenderer.vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const openEditer = ref(false)
const searchContent = ref('')



</script>