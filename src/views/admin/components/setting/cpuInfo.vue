<template>
  <el-card style="margin-top: 10px;">
    <el-row>
      <el-col :span="4">
        <el-card class="cpu-card">
          <div slot="header" class="cpu-card-header">
            <icon-cpu theme="two-tone" size="25" :fill="['#0e0e0e', '#ffffff']" />
            <span class="cpu-card-title">CPU核心数</span>
          </div>
          <div class="cpu-card-content">
            <div class="cpu-card-value">{{ cpuInfo?.cpuNum }}</div>
            <div class="cpu-card-label">核心</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <singleGauge :data="cpuInfo?.sysUsage" :name="cpuName[0]"/>
      </el-col>
      <el-col :span="5">
        <singleGauge :data="cpuInfo?.userUsage" :name="cpuName[1]"/>
      </el-col>
      <el-col :span="5">
        <singleGauge :data="cpuInfo?.ioWait" :name="cpuName[2]"/>
      </el-col>
      <el-col :span="5">
        <singleGauge :data="cpuInfo?.cpuUsage" :name="cpuName[3]"/>
      </el-col>
    </el-row>
  </el-card>
</template>
    
<script lang="ts" setup>
import type { cpuInfoObj } from '@/lib/types';
import singleGauge from './singleGauge.vue';
import { ref, watch } from 'vue'

let props = defineProps(['cpuInfoObj'])
let cpuInfo = ref(props.cpuInfoObj)
let cpuName = ['cpu系统使用率','cpu用户使用率','cpu等待率','cpu使用率']
watch(() => props.cpuInfoObj, (newValue:cpuInfoObj) => {
  cpuInfo.value = newValue
  
})



</script>
    
<style scoped>
.cpu-card {
  width: 180px;
  height: 100%;
}

.cpu-card-header {
  display: flex;
  align-items: center;
}

.cpu-card-title {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
}

.cpu-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.cpu-card-value {
  font-size: 40px;
  font-weight: bold;
}

.cpu-card-label {
  font-size: 14px;
  margin-top: 5px;
}
</style>
    