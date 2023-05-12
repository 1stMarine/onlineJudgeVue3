<template>
    <div class="demo-progress">
        <el-form>
            <el-form-item label="简单">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="easy" status="success" striped/> 
            </el-form-item>
            <el-form-item label="中等"><el-progress :text-inside="true" :stroke-width="24" :percentage="meddle"
                    status="warning" /></el-form-item>

            <el-form-item label="困难">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="hard" status="exception" />


            </el-form-item>
            <el-form-item label="噩梦">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="nightmare" />
            </el-form-item>
        </el-form>

    </div>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { userStore } from '@/store';
import {ref} from 'vue'
const easy = ref(0)
const meddle = ref(0)
const hard = ref(0)
const nightmare = ref(0)

API({
    url: '/getPerDifficultySolveWithPercent/' + userStore().$state.user.id,
    method: 'get'
}).then((res) => {
    easy.value = res.data.data[0].value
    meddle.value = res.data.data[1].value
    hard.value = res.data.data[2].value
    nightmare.value = res.data.data[3].value
})
</script>

<style scoped>
.demo-progress .el-progress--line {
    margin-bottom: 20px;
    width: 90%;
}
</style>