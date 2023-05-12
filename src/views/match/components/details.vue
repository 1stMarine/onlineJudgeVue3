<template>
    <div>
        <el-divider content-position="left"><strong>竞赛信息</strong></el-divider>
        <el-image :src="match.imgUrl" fit="fill" /><br>
        <span>{{ match.matchDescription }}</span>
        <el-divider content-position="left">竞赛类型或须知</el-divider>
        <span>{{ match.matchType }}</span>
    </div>
</template>

<script setup lang="ts">
import API from '@/plugins/axiosInstance';

import { ref, onBeforeMount } from 'vue'
const props = defineProps(['match', 'mid']);
const match = ref({
    id: '',
    matchName: '',
    matchDescription: '',
    createTime: '',
    startTime: '',
    endTime: '',
    persistentTime: '',
    participationCount: '',
    matchType: '',
    imgUrl: '',
    state: ''
})
const mid = ref(props.mid)

// const match = ref({
//     id: '',
//     matchName: '',
//     matchDescription: '',
//     createTime: '',
//     startTime: '',
//     endTime: '',
//     persistentTime: '',
//     participationCount: '',
//     matchType: '',
//     imgUrl: '',
//     state: ''
// })

if (mid.value != undefined) {
    API({
        url: '/getMatchDetail/' + mid.value,
        method: 'get'
    }).then((res) => {
        match.value = res.data.data
    })
} else {
    match.value = props.match
}







</script>