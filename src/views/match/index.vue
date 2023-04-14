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
            <el-button link type="success" @click="toMatchDetial(match)">查看详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-empty v-if="Data.values.length == 0" description="目前还没有进行任何竞赛噢~" />
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import API from '@/plugins/axiosInstance';
import { useRouter } from 'vue-router';
import { matchStore } from '@/stores/matchStore';

const router = useRouter()
onMounted(() => {
  emitter.emit(MittRouterNameSpace.ChangeRouter, "/match");
})

const toMatchDetial = (match:any) => {
  matchStore().setCurrentChoice(match)
  router.push({name:'matchDetial',})
}


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
Data.value = []
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
  