<template>
  <!-- 搜索框 -->
  <el-input
      v-model="searchContent"
      placeholder="搜索题目"
      class="input-with-select"
      size="large"
      @keydown.enter="searchQuestion"
    >
      <template #prepend>
        <el-button :icon="Search" />
      </template>

    </el-input>

    <el-table :data="tableData.question_list" style="width: 100%">
      <el-table-column prop="id" label="#" style="width: 10%;"/>
      <el-table-column  label="题目"  style="width: 70%;">
        <template #default="scope">
          <el-button type="primary" @click="toProblemDetial(scope.row)" link>{{ scope.row.questionName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column #default="scope" label="通过率"  style="width: 10%;">
          {{ scope.row.passRate * 100 }} %
      </el-table-column>
      <el-table-column label="难度"  style="width: 10%;">
        <template #default="scope">
          <el-tag class="ml-2"  v-show="scope.row.difficulty == '简单'">简单</el-tag>
          <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '中等'">中等</el-tag>
          <el-tag class="ml-2" type="warning" v-show="scope.row.difficulty == '困难'">困难</el-tag>
          <el-tag class="ml-2" type="danger" v-show="scope.row.difficulty == '噩梦'">噩梦</el-tag>
        </template>
      </el-table-column>

    </el-table>
  </template>
  
  <script lang="ts" setup>
  import API from '@/plugins/axiosInstance';
  import { Search } from '@element-plus/icons-vue'
  import { ref,computed,reactive} from 'vue'
  import { useRouter } from 'vue-router';
  import type { Question } from '@/lib/types'
  import { onMounted } from 'vue'
  import  emitter from "@/lib/bus";
  import { MittRouterNameSpace } from "@/lib/type";

  onMounted(()=>{
    emitter.emit(MittRouterNameSpace.ChangeRouter,"/problem");
  })



  const router = useRouter()
  const page = ref(1)
  const searchContent = ref("")



  const tableData = reactive({
    question_list:[]
  })

  const toProblemDetial = (question:Question)=>{
    
    router.push({
      name:'problemDetial',
      query:{
        questionName:question.questionName,
        id:String(question.id),

    }})
  }

  const getQuestionList = () => {
    API({
      url:'/getQuestionList/'+page.value+'/',
      method: 'get'
    }).then((res)=>{
      tableData.question_list = res.data.data
    })
  }
  
  getQuestionList()
  console.log(tableData.question_list);
  
  const searchQuestion = ()=>{
    API({
      url:'/searchQuestion/'+page.value+'/'+searchContent.value,
      method: 'post'
    }).then((res)=>{
      console.log(res);
      
      tableData.question_list = res.data.data
    })
  }
  </script>
  