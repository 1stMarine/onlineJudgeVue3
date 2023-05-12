<template>
  <div>
    <h1>{{ questions.question.id }} . {{ questions.question.questionName }}</h1>
    <el-tabs v-model="activeName" class="demo-tabs" style="width: 100%;" v-loading="loading_question">
      <!-- 题目详细信息 -->
      <el-tab-pane label="题目" name="first" style="width: 100%;">
        <div class="common-layout">
          <el-container>
            <el-main>
              <!-- 左侧题目详细信息描述栏 -->
              <el-divider content-position="left"><strong>题目信息</strong></el-divider>
              <span style="white-space: pre-wrap;">{{ questions.question.description }}</span>
              <el-divider content-position="left">输入样式</el-divider>
              <span style="white-space: pre-wrap;">{{ questions.question.inputStyle }}</span>
              <el-divider content-position="left">输出格式</el-divider>
              <span style="white-space: pre-wrap;">{{ questions.question.outputStyle }}</span>
              <el-divider content-position="left">数据范围</el-divider>
              <span>{{ questions.question.dataRange }}</span>
              <el-divider content-position="left">样例输入</el-divider>
              <el-alert v-for="input in questions.question.inputSample" :title="input" type="info" :closable="false"
                style="margin-bottom: 10px;white-space: pre-wrap;" />
              <el-divider content-position="left">样例输出</el-divider>
              <el-alert v-for="output in questions.question.outputSample" :title="output" type="info" :closable="false"
                style="margin-bottom: 10px;white-space: pre-wrap;" />
            </el-main>

            <!-- 右侧题目基础描述栏 -->
            <el-aside width="34%">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <strong>题目基础信息</strong>
                  </div>
                </template>
                <div class="info-item">
                  <div style="float: left;">难度:</div>
                  <div style="float:right">
                    <el-tag class="ml-2" v-show="questions.question.difficulty == '简单'">简单</el-tag>
                    <el-tag class="ml-2" type="success" v-show="questions.question.difficulty == '中等'">中等</el-tag>
                    <el-tag class="ml-2" type="warning" v-show="questions.question.difficulty == '困难'">困难</el-tag>
                    <el-tag class="ml-2" type="danger" v-show="questions.question.difficulty == '噩梦'">噩梦</el-tag>
                  </div>
                </div>
                <div style="clear:both;"></div>
                <el-divider>
                  <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="info-item">
                  <div style="float: left;">时空限制:</div>
                  <div style="float:right">{{ questions.question.timeLimit }}s/{{ parseInt(questions.question.memoryLimit / 1024) }}Mb</div>
                </div>
                <div style="clear:both;"></div>
                <el-divider>
                  <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="info-item">
                  <div style="float: left;">总通过数:</div>
                  <div style="float:right">{{ questions.question.totalPass }}</div>
                </div>
                <div style="clear:both;"></div>
                <el-divider>
                  <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="info-item">
                  <div style="float: left;">总尝试数:</div>
                  <div style="float:right">{{ questions.question.totalAttempt }}</div>
                </div>
                <div style="clear:both;"></div>
                <el-divider>
                  <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="info-item">
                  <div style="float: left;">题目来源:</div>
                  <div style="float:right">{{ questions.question.resource }}</div>
                </div>
                <div style="clear:both;"></div>
                <el-divider>
                  <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="info-item">
                  <div class="demo-collapse">
                    <el-collapse>
                      <el-collapse-item title="算法标签" name="1">
                        <div v-for="tag in questions.question.tag ">
                          <el-tag class="ml-2" type="info" style="float: left;margin: 5px;">{{ tag }}</el-tag>
                        </div>

                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
              </el-card>
            </el-aside>
          </el-container>
        </div>
        <br>
        <!-- 编辑器 -->
        <aceEditor :mode="'normal'" :code="''" :title="''"/>
      </el-tab-pane>
      <el-tab-pane label="提交记录" name="second" style="width: 100%;">
        <!-- 提交记录 -->
        <submitRecord />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import submitRecord from './components/submitRecord.vue'
import aceEditor from '@/components/front/aceEditor.vue'
import { StarFilled } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { questionStore } from '@/stores/questionStore';
import { useRoute } from 'vue-router';
import API from '@/plugins/axiosInstance';
const route = useRoute()
const from = route.query.from
const loading_question = ref(true)
// 当前题目选择存储
const quesitonStore = questionStore()
// tabs激活选择


const activeName = ref('first')





const questions = reactive({
  question: {
    id: 0,
    questionName: '',
    inputStyle: '',
    outputStyle: '',
    inputSample: '',
    outputSample: '',
    dataRange: '',
    difficulty: '',
    timeLimit: 0,
    memoryLimit: 0,
    description: '',
    totalPass: 0,
    totalAttempt: 0,
    resource: '',
    tag: ''
  }
})

if (from == "record") {
  // 从后台加载
  API({
    url: '/getQuestion/' + quesitonStore.$state.currentChoice.qid,
    method: 'get'
  }).then((res) => {
    questions.question = res.data.data
    questions.question.inputSample = JSON.parse(questions.question.inputSample)
    questions.question.outputSample = JSON.parse(questions.question.outputSample)
    questions.question.tag = JSON.parse(questions.question.tag)
    loading_question.value = false
  })
} else {
  // 从pina种加载题目
  questions.question = quesitonStore.$state.currentChoice
  if (typeof questions.question.inputSample == "string") {
    questions.question.inputSample = JSON.parse(questions.question.inputSample)
    questions.question.outputSample = JSON.parse(questions.question.outputSample)
    questions.question.tag = JSON.parse(questions.question.tag)
  } else {
    questions.question.inputSample = questions.question.inputSample
    questions.question.outputSample = questions.question.outputSample
    questions.question.tag = questions.question.tag
  }
  loading_question.value = false


}


</script>

<style scoped>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.text {
  font-size: 14px;
}
</style>