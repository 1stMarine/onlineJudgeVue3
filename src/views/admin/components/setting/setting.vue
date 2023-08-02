<template>
  <el-card>
    <computerInfo :computerInfoObj="settings.sysInfo"/>
  </el-card>
  <cpuInfo :cpuInfoObj="settings.cpuInfo" />
  <el-card style="margin-top: 10px;">
    <el-row>
      <el-col :span="12">
        <jvmInfo :jvmInfoObj="settings.jvmInfo" />
      </el-col>
      <el-col :span="12">
        <memoryInfo :memoryInfoObj="settings.memoryInfo" />
      </el-col>
    </el-row>
  </el-card>
  <el-card style="margin-top: 10px;">
    <fileInfo :fileInfoObj="settings.filesInfo"/>
  </el-card>
</template>

<script lang="ts" setup>
import cpuInfo from './cpuInfo.vue';
import jvmInfo from './jvmInfo.vue';
import memoryInfo from './memoryInfo.vue'
import fileInfo from './fileInfo.vue';
import computerInfo from './computerInfo.vue'
import WebSocketUtil from '@/plugins/WebSocketUtil'
import { onBeforeRouteLeave } from 'vue-router';
import { ref } from 'vue';
import type { sysInfoObj } from '@/lib/types'

// socket获取配置
const socketUtil = new WebSocketUtil("?type=10001")
let settings = ref({} as sysInfoObj)

const getSetting = socketUtil.onMessageReceived = (message: string) => {
  settings.value = JSON.parse(message)
}
onBeforeRouteLeave(() => {
  socketUtil.close()
})







</script>