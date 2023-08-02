<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5" v-loading="rankLoading" element-loading-background="rgba(256, 256, 256, 1)" element-loading-text="正在拼命加载中...">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">排名</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">用户</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">通过详情</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">得分</th>

        </tr>
      </thead>

      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50"  v-for="(rank,index) in tableData">
          <td class="px-6 py-4">#{{index+1}}</td>
          <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div class="relative h-10 w-10">
              <img class="h-full w-full rounded-full object-cover object-center"
                :src="rank.url"
                alt="" />
                <!-- 在线提示绿点 -->
              <!-- <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> -->
            </div>
            <div class="text-sm">
              <div class="font-medium text-gray-700">{{ rank.userName }}</div>
              <div class="text-gray-400">{{ rank.email }}</div>
            </div>
          </th>

          <td class="px-6 py-4">
            <div class="flex gap-2" v-for="(items,index) in rank.results">
              <span v-if="rank.results[index] == 'Accept'"
                class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                {{ rank.results[index] }}
              </span>
              <span v-else-if="rank.results[index] == 'Empty'"
                class="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600">
                {{ rank.results[index] }}
              </span>
              <span v-else="rank.results[index]!= 'Accept'"
                class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                {{ rank.results[index] }}
              </span>
            </div>
          </td>
          <td class="px-6 py-4">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              {{ rank.totalScore }}
            </span>
          </td>
        </tr>

      </tbody>
    </table>
  </div>

</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { ref } from 'vue'
import { matchStore } from '@/stores/matchStore';
const indexMethod = (index: number) => {
  return ++index
}
const rankLoading = ref(true)
const prop = defineProps(['mid'])
const mid = ref(matchStore().$state.currentChoice.id)
if (mid.value == undefined || mid.value == "") {
  mid.value = prop.mid
}
const tableData = ref([])
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
    rankLoading.value = false
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