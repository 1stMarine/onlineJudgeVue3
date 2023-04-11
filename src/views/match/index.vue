<template>
  <el-row>
    <!-- TODO 刷新后不再如数据 -->
    <el-col v-for="(match, index) in Data" :key="match" :span="7">
      <el-card :body-style="{ padding: '0px' }" style="margin: 10px;">
        <img :src="match.imgUrl" class="image" />
        <div style="padding: 14px">
          <h2>{{ match.matchName }}</h2> <br>
          <hr>
          <span>开始时间 : {{ match.startTime }}</span> <br>
          <hr>
          <span>持续时间 : {{ match.persistentTime }} 分钟</span> <br>
          <hr>
          <div class="bottom">
            <div v-show="match.state == '未开始'"> <el-tag  type="success" class="mx-1" effect="dark" round>{{ match.state }}</el-tag></div>
            <div v-show="match.state == '已开始'"> <el-tag  type="danger" class="mx-1" effect="dark" round>{{ match.state }}</el-tag></div>
            <div v-show="match.state == '已结束'"> <el-tag  type="info" class="mx-1" effect="dark" round>{{ match.state }}</el-tag></div>
            <el-button link type="success" @click="toMatchDetial(match.id)">查看详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import API from '@/plugins/axiosInstance';
import { useRouter } from 'vue-router';
import { userStore } from '@/store';

const router = useRouter()
onMounted(() => {
  emitter.emit(MittRouterNameSpace.ChangeRouter, "/match");
})

const toMatchDetial = (id:string) => {
  router.push({
      name:'matchDetial',
      query:{
        id:String(id),
    }})
}

type Match = {
  id: number,
  matchName: string,
  matchDescription: string,
  createTime: string,
  startTime: string,
  endTime: string,
  persistentTime: number,
  participationCount: number,
  matchType: string,
  imgUrl: string,
  state: string
}

const Data = ref([])

const loadMatchList = () => {
  API({
    url: '/getMatchList',
    method: 'post'
  }).then((res) => {

    Data.value = res.data.data
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
  