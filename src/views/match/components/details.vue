<template>

    <div>
    <el-divider content-position="left"><strong>竞赛信息</strong></el-divider>
    <span>{{ match.matchName }}</span>
    <el-divider content-position="left">输入样式</el-divider>
    <span>{{ match.matchDescription }}</span>

    </div>

</template>

<script setup lang="ts">
const props = defineProps(['match']);
const match = props.match




</script>