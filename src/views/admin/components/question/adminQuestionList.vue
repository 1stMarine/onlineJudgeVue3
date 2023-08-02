<template>
  <!-- 搜索框 -->
  <el-input v-model="searchContent" placeholder="搜索题目" class="input-with-select" size="large"
    @keydown.enter="searchQuestion">
    <template #prepend>
      <el-button :icon="Search" />
    </template>
  </el-input>
  <el-table :data="questionList" style="width: 100%" v-loading="questionLoding">
    <el-table-column type="index" width="50" />
    <el-table-column prop="questionName" label="题目" width="auto" />
    <el-table-column prop="difficulty" label="难度" width="auto">
      <template #default="scope">
        <el-tag class="ml-2" v-show="scope.row.difficulty == '简单'">简单</el-tag>
        <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '中等'">中等</el-tag>
        <el-tag class="ml-2" type="warning" v-show="scope.row.difficulty == '困难'">困难</el-tag>
        <el-tag class="ml-2" type="danger" v-show="scope.row.difficulty == '噩梦'">噩梦</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="auto" #default="scope">
      <el-row>
        <el-button type="primary" :icon="Edit" circle @click="editQuestion(scope.row.id, scope.row.questionName)" />

        <el-button type="info" :icon="Setting" circle @click="toManageMatch(scope.row.id)" />

        <el-button type="danger" :icon="Delete" circle @click="deleteQuestion(scope.row.id)" />
      </el-row>
    </el-table-column>

  </el-table>
  <!-- 分页 -->
  <el-pagination class="pagination" background layout="prev, pager, next" :total="totalSize" :page-size="pageSize"
    @current-change="changePage" />


  <!-- 修改dialog -->
  <el-dialog v-model="editVisible" :show-close="false" :destroy-on-close="true">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ editName }}</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <editQuestionCard type="edit" />
  </el-dialog>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { userStore } from '@/store';
import { ref, getCurrentInstance } from 'vue'
import {
  Delete,
  Edit,
  Setting,
  Search,
  CircleCloseFilled
} from '@element-plus/icons-vue'
import { ElNotification, ElMessage } from 'element-plus';
import router from '@/router';
import editQuestionCard from './editQuestion.vue';

import { questionStore } from '@/stores/questionStore';
const internalInstance = getCurrentInstance()
// 全局变量
const globalProperties = internalInstance?.appContext.config.globalProperties
const page = ref(1)
const questionList = ref([])
const questionLoding = ref(true)
const totalSize = ref(0)
const pageSize = ref(15)
const searchContent = ref('')
const editVisible = ref(false)
const editName = ref('')

const showMsg = (res: any) => {
  if (res.data.state === 40001) {
    ElMessage({
      message: res.data.message,
      type: 'success'
    })
  } else {
    ElMessage.error(res.data.message)
  }
}

const deleteQuestion = (qid: string) => {
  let form = new FormData()
  console.log(qid);

  form.append('qid', qid)
  API({
    url: '/deleteQuestion',
    method: 'delete',
    data: form
  }).then((res) => {
    showMsg(res)
    getQuestionList()
  })
}


// 改变页码
const changePage = (new_page: number) => {
  questionLoding.value = true
  page.value = new_page
  // TODO: 分页的时候选择是搜索分页还是正常分页
  getQuestionList()
}
// 加载题目
const getQuestionList = () => {
  // 统计总题目数量
  API({
    url: '/countQuestion',
    method: 'get'
  }).then((res) => {
    totalSize.value = res.data.data
  })
  API({
    url: '/getQuestionList/' + page.value + "/0",
    method: 'get'
  }).then((res) => {
    questionList.value = res.data.data
    questionLoding.value = false
  })

}
getQuestionList()

// 搜索题目
const searchQuestion = () => {
  if (searchContent.value == "") {
    ElNotification({
      title: "0_o",
      message: "你不告诉我要什么，我很难给你办啊",
      type: 'error',
    })
    return
  }
  API({
    url: '/searchQuestion/' + page.value + '/' + searchContent.value,
    method: 'post'
  }).then((res) => {
    totalSize.value = res.data.data.length
    questionList.value = res.data.data
  })
}
// 去修改题目
const editQuestion = (id: string, questionName: string) => {
  console.log(id);

  questionStore().setEditQuestionId(id)
  editName.value = questionName
  editVisible.value = true
}
// 跳转竞赛管理页面
const toManageMatch = (id: string) => {
  router.push({
    path: '/admin/manageMatch',
    query: { mid: id }
  })
}

</script>
  