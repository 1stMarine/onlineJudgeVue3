<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="120" />
    <el-table-column prop="matchName" label="竞赛名" width="200" />
    <el-table-column prop="createTime" label="创建时间" width="180" />
    <el-table-column prop="persistentTime" label="持续时间(分钟)" width="150" />
    <el-table-column #default="scope" label="状态" >
      <div v-show="scope.row.state == '未开始'"> <el-tag type="success" class="mx-1" effect="dark" round>{{ scope.row.state
      }}</el-tag></div>
      <div v-show="scope.row.state == '已开始'"> <el-tag type="danger" class="mx-1" effect="dark" round>{{ scope.row.state
      }}</el-tag></div>
      <div v-show="scope.row.state == '已结束'"> <el-tag type="info" class="mx-1" effect="dark" round>{{ scope.row.state
      }}</el-tag>
      </div>
    </el-table-column>

    <el-table-column label="操作" #default="scope" width="200">
      <el-row>
        <el-button type="primary" :icon="Edit" circle @click="editMatch(scope)" />

        <el-button type="info" :icon="Setting" circle @click="toManageMatch(scope.row.id)" />

        <el-button type="danger" :icon="Delete" circle @click="deleteMatch(scope.row.id)" />
      </el-row>
    </el-table-column>

  </el-table>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { getCurrentInstance, inject, ref } from 'vue'
import {matchStore} from '@/stores/matchStore'
import {
  Delete,
  Edit,
  Setting
} from '@element-plus/icons-vue'
import router from '@/router';
const internalInstance = getCurrentInstance()
const globalProperties = internalInstance?.appContext.config.globalProperties
const tableData = ref([])
const editMatch = (match:any) => {
  console.log("match",match);
}
// 跳转竞赛管理页面
const toManageMatch = (id: string) => {
  router.push({
    path: '/admin/manageMatch',
    query: { mid: id }
  })
}
const showMsg: any = inject('showMsg')
// 加载竞赛列表
const loadMatchList = () => {
  API({
    url: '/getMatchList',
    method: 'post'
  }).then((res) => {
    tableData.value = res.data.data
  })
}
loadMatchList()

// 删除竞赛
const deleteMatch = (id: string) => {
  API({
    url: '/deleteMatch/' + id,
    method: 'get'
  }).then((res) => {
    if (res.data.state == globalProperties?.$SUCCESS) {
      loadMatchList()
      showMsg(res.data.message, true)
    } else {
      showMsg(res.data.message, false)

    }
  })
}


</script>
  