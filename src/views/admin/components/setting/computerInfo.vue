<template>
    <el-row>
        <el-col :span="12">
            <div class="flex items-center mb-4">
                <icon-computer theme="two-tone" size="24" :fill="['#0e0e0e' ,'#ffffff']"/>
                <h2 class="text-lg font-bold">操作系统信息</h2>
            </div>
            <p class="text-gray-600 mb-4">{{ computerInfo.osName }}</p>

            <div class="flex items-center mb-4">
                <icon-chip theme="two-tone" size="24" :fill="['#0e0e0e' ,'#ffffff']"/>
                <h2 class="text-lg font-bold">系统架构</h2>
            </div>
            <p class="text-gray-600 mb-4">{{ computerInfo.osArch }}</p>

            <div class="flex items-center mb-4">
                <icon-code-laptop theme="two-tone" size="24" :fill="['#0e0e0e' ,'#ffffff']"/>
                <h2 class="text-lg font-bold">计算机名</h2>
            </div>
            <p class="text-gray-600 mb-4">{{ computerInfo.computeName }}</p>

            <div class="flex items-center mb-4">
                <icon-network-drive theme="two-tone" size="24" :fill="['#0e0e0e' ,'#ffffff']"/>
                <h2 class="text-lg font-bold">IP地址</h2>
            </div>
            <p class="text-gray-600 mb-4">{{ computerInfo.ip }}</p>

            <div class="flex items-center mb-4">
                <icon-folder-open theme="two-tone" size="24" :fill="['#0e0e0e' ,'#ffffff']"/>
                <h2 class="text-lg font-bold">项目路径</h2>
            </div>
            <p class="text-gray-600 mb-4">{{ computerInfo.projectDir }}</p>
        </el-col>
        <el-col :span="12">
                <span class="demonstration">站点标志</span>
                <el-image :src="url" style="width: 400px; height: 400px">
                    <template #error>
                        <div class="image-slot" >
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import type {computerInfoObj} from '@/lib/types'

const url = ref("http://www.nextstepcode.club:443/online-image-bed/2023-08-01/1911a8fd-aa76-4ccf-8461-bfa4817f0298.png")
const props = defineProps(["computerInfoObj"])
const computerInfo = ref<computerInfoObj>({} as computerInfoObj)

watch(() => props.computerInfoObj, (newValue: computerInfoObj) => {
    console.log(newValue);
    computerInfo.value = newValue
})

</script>