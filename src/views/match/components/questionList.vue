<template>

  
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
            <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '简单'">简单</el-tag>
            <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '中等'">中等</el-tag>
            <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '困难'">困难</el-tag>
            <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '噩梦'">噩梦</el-tag>
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
    import { ElNotification } from 'element-plus'
    import { judgerStore } from '@/stores/judgerStore';   
    import { questionStore } from '@/stores/questionStore';

    const props = defineProps(['questions','state']);

    
        
    
    const router = useRouter()

  
  
    const tableData = reactive({
      question_list:props.questions
    })
  
    const toProblemDetial = (question:Question)=>{
      questionStore().setCurrentChoice(question)
      judgerStore().setJudgeType(101)
      if(props.state != '已开始'){
        ElNotification({
                title: "不润许的操作!",
                message: "比赛状态已经结束或未开始!",
                type: 'error',
            })
        return
      }
      router.push({name:'problemDetial'})
    }
  

    

    </script>
    