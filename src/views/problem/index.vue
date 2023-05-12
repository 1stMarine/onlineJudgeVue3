<template>
  <!-- 搜索框 -->
  <el-input v-model="searchContent" placeholder="搜索题目" class="input-with-select" size="large"
    @keydown.enter="searchQuestion">
    <template #prepend>
      <el-button :icon="Search" />
    </template>
  </el-input>
  <!-- 题目列表 -->
  <el-table :data="tableData.question_list" style="width: 100%" v-loading="loading">
    <el-table-column label="#" style="width: 10%;" #default="scope">
      {{ scope.row.id }}
      <el-popover placement="top-start" title="通过！" :width="200" trigger="hover"
        content="你已经成功征服这道题目=)">
        <template #reference>
          <icon-check-one v-if="scope.row.uid != 0" theme="two-tone" size="23" :fill="['#333', '#7ed321']"
            :strokeWidth="2" />

        </template>

      </el-popover>
    </el-table-column>

    <el-table-column label="题目" style="width: 70%;">
      <template #default="scope">
        <el-button type="primary" @click="toProblemDetial(scope.row)" link>{{ scope.row.questionName }}</el-button>
      </template>
    </el-table-column>
    <el-table-column #default="scope" label="通过率" style="width: 10%;">
      {{ scope.row.passRate * 100 }} %
    </el-table-column>
    <el-table-column label="难度" style="width: 10%;">
      <template #default="scope">
        <el-tag class="ml-2" v-show="scope.row.difficulty == '简单'">简单</el-tag>
        <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '中等'">中等</el-tag>
        <el-tag class="ml-2" type="warning" v-show="scope.row.difficulty == '困难'">困难</el-tag>
        <el-tag class="ml-2" type="danger" v-show="scope.row.difficulty == '噩梦'">噩梦</el-tag>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination class="pagination" background layout="prev, pager, next" :total="total_size" :page-size="page_size"
    @current-change="changePage" />
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import type { Question } from '@/lib/types'
import { questionStore } from '@/stores/questionStore';
import { ElNotification } from 'element-plus'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import { judgerStore } from '@/stores/judgerStore';
import { userStore } from '@/store';
import { Scope } from 'tools-vue3';
const router = useRouter()
// 统一导航栏的激活状态样式
onMounted(() => {
  emitter.emit(MittRouterNameSpace.ChangeRouter, "/problem");
})

// 一页显示几个题目
const page_size = 15;

// 当前第几页
const page = ref(1)
// 搜索内容
const searchContent = ref("")
// 总题目大小
const total_size = ref(0)
// table加载状态
const loading = ref(true)
// 统计总题目数量
API({
  url: '/countQuestion',
  method: 'get'
}).then((res) => {
  total_size.value = res.data.data
})

const tableData = reactive({
  // 题目列表
  question_list: [],
  resolve_list: []
})
// 跳转题目详情
const toProblemDetial = (question: Question) => {
  judgerStore().setJudgeType(100)
  questionStore().setCurrentChoice(question)
  router.push({ name: 'problemDetial' })
}
// 改变页码
const changePage = (new_page: number) => {
  loading.value = true
  page.value = new_page
  // TODO: 分页的时候选择是搜索分页还是正常分页
  getQuestionList()
}
// 加载题目
const getQuestionList = () => {
  let url = '/getQuestionList/' + page.value + '/0'
  if (userStore().$state.isLogin == true) {
    url = '/getQuestionList/' + page.value + '/' + userStore().$state.user.id
  }
  API({
    url: url,
    method: 'get'
  }).then((res) => {
    loading.value = false
    tableData.question_list = res.data.data
  })
  // 如果登录了，加载已经解决的题目

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
    total_size.value = res.data.data.length
    tableData.question_list = res.data.data
  })
}
</script>

<style lang="css">
.pagination {
  justify-content: center;
  margin-top: 20px;

}
</style>
  