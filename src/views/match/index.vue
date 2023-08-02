<template>
  <el-container>
    <el-aside width="20%">
      <noticeBoard></noticeBoard>

    </el-aside>
    <el-container style="min-height: 105vh;">
      <el-header>

      </el-header>
      <el-main>
        <el-card shadow="always" style="height: 100%" class="bg-gray-200" v-loading="matchListLoading" element-loading-background="rgba(256, 256, 256, 1)" element-loading-text="正在拼命加载中...">
          <!-- 最新推荐 -->

          <div class="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white" v-show="Data.length > 0">
            <div class="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
      max-w-7xl">
              <div class="flex flex-col items-center sm:px-5 md:flex-row">
                <div
                  class="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
                  <div class="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5">
                    <div class="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
              uppercase inline-block">
                      <p class="inline">
                        <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                  00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                  1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                  0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </p>
                      <p class="inline text-xs font-medium">最新</p>
                    </div>
                    <a class="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">{{ Data[0].matchName }}</a>
                    <div class="mb-2">
                      <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">{{
                        JSON.stringify(Data[0].matchName).slice(0, 20) + "......" }}</p>
                      <p>
                      <div class="bottom">
                        <div v-show="Data[0].state == '未开始'"> <el-tag type="success" class="mx-1" effect="dark" round>{{
                          Data[0].state
                        }}</el-tag></div>
                        <div v-show="Data[0].state == '已开始'"> <el-tag type="danger" class="mx-1" effect="dark" round>{{
                          Data[0].state
                        }}</el-tag></div>
                        <div v-show="Data[0].state == '已结束'"> <el-tag type="info" class="mx-1" effect="dark" round>{{
                          Data[0].state
                        }}</el-tag></div>
                      </div>
                      </p>
                    </div>
                    <div class="flex items-center justify-between md:items-center lg:justify-between ">
                      <div class="flex">
                        <p class="!mb-0 text-sm font-bold text-brand-500">{{ Data[0].startTime }}<span> 开始</span></p>
                      </div>
                      <button href="" @click="toMatchDetial(Data[0])" style="margin-left: 20px;"
                        class="linear rounded-[20px] bg-brand-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700">查看详情</button>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/2">
                  <div class="relative w-full">
                    <img :src="Data[0].imgUrl" class="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt="">
                    <button
                      class="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                      <div class="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 30C30.6274 30 36 24.4694 36 17.6471V4H12V17.6471C12 24.4694 17.3726 30 24 30Z"
                            fill="#ffffff" stroke="#9b9b9b" stroke-width="4" stroke-linejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21V11H4C4 17.6667 8 21 12 21Z"
                            stroke="#9b9b9b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M36 21V11H44C44 17.6667 40 21 36 21Z"
                            stroke="#9b9b9b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M24 32V36" stroke="#9b9b9b" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M15 42L18.69 36H29.0425L33 42H15Z" fill="#ffffff" stroke="#9b9b9b" stroke-width="4"
                            stroke-linejoin="round" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <el-row 
            element-loading-text="正在拼命加载中..."> 
            <el-col v-for="(match, index) in Data" :key="match" :span="8" v-show="index != -1">
              <matchCard :match="match" />
            </el-col>
          </el-row>


          <el-empty v-if="Data.length == 0" description="目前还没有进行任何竞赛噢~" />
        </el-card>

      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
    <el-aside width="20%"></el-aside>
  </el-container>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import API from '@/plugins/axiosInstance';
import matchCard from './components/matchCard.vue';
import { matchStore } from '@/stores/matchStore';
import { useRouter } from 'vue-router';
const router = useRouter()
const matchListLoading = ref(true)
onMounted(() => {
  emitter.emit(MittRouterNameSpace.ChangeRouter, "/match");
})




const Data = ref([
  {
    id: '',
    matchName: 0,
    matchDescription: 0,
    createTime: 0,
    startTime: 0,
    endTime: 0,
    persistentTime: 0,
    participationCount: 0,
    matchType: 0,
    imgUrl: '',
    state: ''
  }
])

const toMatchDetial = (match: any) => {
  matchStore().setCurrentChoice(match)
  router.push({ name: 'matchDetial', })
}
const loadMatchList = () => {

  API({
    url: '/getMatchList',
    method: 'post'
  }).then((res) => {
    Data.value = res.data.data
    matchListLoading.value = false
  })
}
loadMatchList()



</script>
  
<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
  