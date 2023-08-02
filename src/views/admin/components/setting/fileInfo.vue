<template>
    <table class="w-full">
        <thead>
            <tr
                class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="px-4 py-3">#</th>
                <th class="px-4 py-3">磁盘名</th>
                <th class="px-4 py-3">磁盘类型</th>
                <th class="px-4 py-3">文件类型</th>
                <th class="px-4 py-3">总大小</th>
                <th class="px-4 py-3">可使用</th>
                <th class="px-4 py-3">已使用</th>
                <th class="px-4 py-3">使用率</th>
            </tr>
        </thead>
        <tbody class="bg-white" >
            <tr class="text-gray-700" v-for="(file,index) in fileInfos">
                <td class="px-4 py-3 border">{{ index }}</td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ file.dirName }}</td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ file.dirType }}</td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ file.fileType }}</td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ formatByte(file.totalSize) }}</td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ formatByte(file.freeSize) }}</td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ formatByte(file.usedSize) }}</td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ file.usage}}%</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type {fileInfoObj} from '@/lib/types'
import { watch,reactive } from 'vue'
const props = defineProps(["fileInfoObj"])

interface fileList {
    [index:number]:fileInfoObj
}

let fileInfos = reactive<fileList>([])


watch(() => props.fileInfoObj, (newValue: fileList) => {
    fileInfos = newValue
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