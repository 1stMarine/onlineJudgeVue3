<template>

  <el-table :data="tableData" style="width: 100%;height: 500px;">
    <el-table-column type="index" :index="indexMethod"  label="排名"/>
    <el-table-column label="用户id" prop="uid"  width="180"/>
    <el-table-column label="用户名"  width="180">
      <template #default="scope">
        <a href="">{{ scope.row.userName }}</a>
      </template>
    </el-table-column>
    <el-table-column>
      <el-table-column v-for="(items, indexs) in tableData[0].results" :key="indexs" :prop="items" :label="indexs"  >
        <template #default="scope">
          <el-tag v-if="scope.row.results[indexs] == 'Accept'" class="ml-2" type="success" >{{scope.row.results[indexs]}}</el-tag>
          <el-tag v-else-if="scope.row.results[indexs] == 'Empty'" class="ml-2" type="info" >未提交</el-tag>
          <el-tag v-else="scope.row.results[indexs] != 'Accept'" class="ml-2" type="danger" >{{scope.row.results[indexs]}}</el-tag>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="得分" prop="totalScore" width="80"/>

  </el-table>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { ref } from 'vue'
import { matchStore } from '@/stores/matchStore';
const indexMethod = (index: number) => {
  return ++index
}
const prop = defineProps(['mid'])
const mid = ref(matchStore().$state.currentChoice.id)
if(mid.value == undefined || mid.value == "" ){
  mid.value = prop.mid
}
const tableData = ref([
  // {
  //   "id": 288423936,
  //   "uid": 282718464,
  //   "userName": "gg",
  //   "mid": 288423681,
  //   "results": "{\"281961728\":\"Accept\",\"287716992\":\"Accept\"}",
  //   "totalScore": 2
  // },
  // {
  //   "id": 288423936,
  //   "uid": 282718464,
  //   "userName": "ckw",
  //   "mid": 288423681,
  //   "results": "{\"281961728\":\"Accept\",\"287716992\":\"WrongAnswer\"}",
  //   "totalScore": 1
  // }
])
const len = ref(0)
const results_index = ref(0)
const loadRank = () => {
  API({
    url: '/getMatchRank/' + mid.value,
    method: 'get'
  }).then((res) => {

    tableData.value = res.data.data
    tableData.value.forEach(element => {
      element.results = JSON.parse(element.results)
    });
    len.value = res.data.data.length
    results_index.value = res.data.data.length
    console.log(tableData.value);

  })
}
loadRank()
</script>
<style scoped>
.ml-2 {
  height: 50px;
  width: 100px;
}
</style>