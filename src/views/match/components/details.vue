<template>
    <div >
        <el-divider content-position="left"><strong>竞赛信息</strong></el-divider>
        <v-md-editor v-model="match.matchDescription" mode="preview"></v-md-editor>

    </div>
</template>

<script setup lang="ts">

const props = defineProps(['match']);
const match = props.match







</script>