<template>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(val, key, index) in records.record_list" :name="index">
                <template #title>
                    <el-tag type="danger" effct="dark" round>有作弊嫌疑的代码分组!</el-tag>
                </template>
                <antiCheatRecord :records="val" />
            </el-collapse-item>

        </el-collapse>
    </div>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { ref, reactive } from 'vue'
import antiCheatRecord from '@/views/match/components/antiCheatRecord.vue';
const props = defineProps(['mid']);
const mid = props.mid
const count = ref(0)
const records = reactive({
    record_list: {}
})
API({
    url: '/getMatchSubmitCluster/' + mid,
    method: 'get'
}).then((res) => {
    records.record_list = reactive(res.data.data)
    // Object.entries(res.data.data).forEach(([k, v]) => {
    //     count.value += 1
    // });

})

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
}
</script>
  