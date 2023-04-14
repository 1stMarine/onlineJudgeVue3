<template>
    <el-page-header @back="onback" >
        <template #content>
            <span class="text-large font-600 mr-3"> 竞赛管理 </span>
        </template>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="height: 100%;">
            <el-tab-pane label="竞赛详情" name="first"><Detials :mid="mid"/></el-tab-pane>
            <el-tab-pane label="排名" name="second"><rank/></el-tab-pane>
            <el-tab-pane label="反作弊" name="third"><matchAntiCheat :mid="mid"/></el-tab-pane>
        </el-tabs>
    </el-page-header>
</template>
  
<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import matchAntiCheat from './matchAntiCheat.vue'
import { useRoute } from 'vue-router';
import Detials from '@/views/match/components/details.vue';
import rank from '@/views/match/components/rank.vue';
const route = useRoute()
const mid = route.query.mid



const activeName = ref('first')

const onback = () => {
    router.push('/admin/adminMatchList')
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
}
</script>