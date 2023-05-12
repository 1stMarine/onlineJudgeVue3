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
        <el-button type="primary" :icon="Edit" circle @click="editMatch(scope.row.id,scope.row.matchName)" />

        <el-button type="info" :icon="Setting" circle @click="toManageMatch(scope.row.id)" />

        <el-button type="danger" :icon="Delete" circle @click="deleteMatch(scope.row.id)" />
      </el-row>
    </el-table-column>

  </el-table>

  <!-- 修改dialog -->
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ editMatchName }}</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    <addMatch type="edit"/>
  </el-dialog>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { getCurrentInstance, inject, ref } from 'vue'
import addMatch from './addMatch.vue';
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
const visible = ref(false)

const editMatchName = ref("None")
// 去修改竞赛
const editMatch = (id:string,matchName:string) => {
  matchStore().setEditMatchId(id)
  editMatchName.value = matchName
  visible.value = true
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

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>