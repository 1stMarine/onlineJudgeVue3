<template>
            <!--👇 Copy code below 👇-->
            <div>
            <div class="group bg-gray-10 p-4 transition-all duration-300 hover:rotate-1 lg:p-8">
                <div class="mb-3 text-right">
                    <button class="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                            <path
                                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    </button>
                </div>
                <div class="flex items-center gap-x-2">
                    <icon-memory-card theme="two-tone" size="50" :fill="['#0e0e0e' ,'#ffffff']"/>
                    <div>
                        <h3 class="text-xl font-bold ">内存使用信息</h3>
                        <span class="text-xs ">_</span>
                    </div>
                </div>
                <div class="my-4" style="margin-top: 28px;">
                    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div class="w-full overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr
                                        class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                        <th class="px-4 py-3">参数</th>
                                        <th class="px-4 py-3">数值</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr class="text-gray-700">
                                        <td class="px-4 py-3 border">总内存大小</td>
                                        <td class="px-4 py-3 text-ms font-semibold border">{{ formatByte(memoryInfo?.totalMemory) }}</td>
                                    </tr>
                                    <tr class="text-gray-700">
                                        <td class="px-4 py-3 border">已使用内存大小</td>
                                        <td class="px-4 py-3 text-ms font-semibold border">{{ formatByte(memoryInfo?.usedMemory) }}</td>
                                    </tr>
                                    <tr class="text-gray-700">
                                        <td class="px-4 py-3 border">空闲内存大小</td>
                                        <td class="px-4 py-3 text-ms font-semibold border">{{ formatByte(memoryInfo?.freeMemory) }}</td>
                                    </tr>
                                    <tr class="text-gray-700">
                                        <td class="px-4 py-3 border">pagesize</td>
                                        <td class="px-4 py-3 text-ms font-semibold border">{{ formatByte(memoryInfo?.pageSize) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <el-progress type="dashboard" :percentage="memoryInfo?.usageMemory" :color="colors">
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <span class="percentage-label">内存使用率</span>
                    </template>
                </el-progress>
            </div>
        </div>


</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { memoryInfoObj } from '@/lib/types'
const props = defineProps(['memoryInfoObj'])

const memoryInfo = ref(props.memoryInfoObj)

const colors = [
    { color: '#006400', percentage: 20 },
    { color: '#228b22', percentage: 40 },
    { color: '#408080', percentage: 60 },
    { color: '#8b4513', percentage: 80 },
    { color: '#8b0000', percentage: 100 },
];

watch(() => props.memoryInfoObj, (newValue: memoryInfoObj) => {
    memoryInfo.value = newValue
})


function formatByte(byteNumber: number): string {
  const FORMAT = 1024.0;
  let kbNumber = byteNumber / FORMAT;

  if (kbNumber < FORMAT) {
    return kbNumber.toFixed(2) + "KB";
  }

  let mbNumber = kbNumber / FORMAT;
  if (mbNumber < FORMAT) {
    return mbNumber.toFixed(2) + "MB";
  }

  let gbNumber = mbNumber / FORMAT;
  if (gbNumber < FORMAT) {
    return gbNumber.toFixed(2) + "GB";
  }

  let tbNumber = gbNumber / FORMAT;
  return tbNumber.toFixed(2) + "TB";
}
</script>

<style scoped>
.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}

.demo-progress .el-progress--circle {
    margin-right: 15px;
}</style>