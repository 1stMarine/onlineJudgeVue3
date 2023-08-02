<template>
    <el-form :model="questions.question" label-width="120px">
        <!-- 题目名 -->
        <el-form-item label="题目名">
            <el-input v-model="questions.question.questionName" />
        </el-form-item>
        <el-form-item label="难度">
            <el-select v-model="questions.question.difficulty" placeholder="Select">
                <el-option v-for="item in difficulty" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="时间限制">
            <el-input-number v-model="questions.question.timeLimit" :min="1" :max="10" /> S
        </el-form-item>
        <el-form-item label="空间限制">
            <el-input-number v-model="questions.question.memoryLimit" :min="1" :max="10" /> MB
        </el-form-item>
        <el-form-item label="题目信息">
            <!-- markdown编辑器 -->
            <v-md-editor v-model="questions.question.description" height="80%" :disabled-menus="[]"
                @upload-image="handleUploadImage"></v-md-editor>
        </el-form-item>
        <el-form-item label="输入样式">
            <!-- markdown编辑器 -->
            <v-md-editor v-model="questions.question.inputStyle" height="80%" :disabled-menus="[]"
                @upload-image="handleUploadImage"></v-md-editor>
        </el-form-item>
        <el-form-item label="输出样式">
            <!-- markdown编辑器 -->
            <v-md-editor v-model="questions.question.outputStyle" height="80%" :disabled-menus="[]"
                @upload-image="handleUploadImage"></v-md-editor>
        </el-form-item>
        <el-form-item label="数据范围">
            <!-- markdown编辑器 -->
            <v-md-editor v-model="questions.question.dataRange" height="80%" :disabled-menus="[]"
                @upload-image="handleUploadImage"></v-md-editor>
        </el-form-item>
        <!-- 输入输出样例 -->
        <el-form-item label="输入、输出演示样例">
            <!-- 添加框 -->
            <el-input v-model="addInputSample" :rows="4" style="width: 50%;" type="textarea" placeholder="添加新的输入演示样例" />
            <el-input v-model="addOutputSample" :rows="4" style="width: 50%;" type="textarea" placeholder="添加新的输出演示样例" />
            <!-- 添加按钮 -->
            <el-button type="primary" @click="" style="margin-top: 10px;margin-bottom: 10px;">添加</el-button>
            <!-- 展示表格 -->
            <el-table :data="questions.question.inputSample" border style="width: 100%" max-height="200px">
                <el-table-column type="index" width="50" label="#" />
                <el-table-column label="输入" style="50%" #default="scope">
                    <el-input v-model="scope.row" :rows="2" style="width: 100%;" type="textarea" placeholder="Please input"
                        disabled />
                </el-table-column>
                <el-table-column label="操作" style="10%" #default="scope">
                    <el-button type="danger" @click="">删除</el-button>
                </el-table-column>
            </el-table>

            <el-table :data="questions.question.outputSample" border style="width: 100%" max-height="200px">
                <el-table-column type="index" width="50" label="#" />
                <el-table-column label="输出" style="50%" #default="scope">
                    <el-input v-model="scope.row" :rows="2" style="width: 100%;" type="textarea" placeholder="Please input"
                        disabled />
                </el-table-column>
                <el-table-column label="操作" style="10%" #default="scope">
                    <el-button type="danger" @click="">删除</el-button>
                </el-table-column>
            </el-table>
        </el-form-item>
        <!-- 输入输出测试样例 -->
        <el-form-item label="输入、输出测试样例">
            <!-- 添加框 -->
            <el-input v-model="addTestInputSample" :rows="4" style="width: 50%;" type="textarea" placeholder="添加新的输入测试样例" />
            <el-input v-model="addTestOutputSample" :rows="4" style="width: 50%;" type="textarea"
                placeholder="添加新的输出测试样例" />
            <!-- 添加按钮 -->
            <el-button type="primary" @click="addSample(addTestInputSample, addTestOutputSample)"
                style="margin-top: 10px;margin-bottom: 10px;">添加</el-button>
            <!-- 展示表格 -->
            <el-table :data="testSamples.testSample.sampleInputArray" border style="width: 100%" max-height="200px">
                <el-table-column type="index" width="50" label="#" />
                <el-table-column label="输入" style="50%" #default="scope">
                    <el-input v-model="scope.row" :rows="2" style="width: 100%;" type="textarea" placeholder="Please input"
                        disabled />
                </el-table-column>
                <el-table-column label="操作" style="10%" #default="scope">
                    <el-button type="danger" @click="removeSample(scope.row)">删除</el-button>
                </el-table-column>
            </el-table>

            <el-table :data="testSamples.testSample.sampleOutputArray" border style="width: 100%" max-height="200px">
                <el-table-column type="index" width="50" label="#" />
                <el-table-column label="输出" style="50%" #default="scope">
                    <el-input v-model="scope.row" :rows="2" style="width: 100%;" type="textarea" placeholder="Please input"
                        disabled />
                </el-table-column>
                <el-table-column label="操作" style="10%" #default="scope">
                    <el-button type="danger" @click="">删除</el-button>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="题目来源">
            <el-input v-model="questions.question.resource" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="算法标签">
            <!-- 标签选择 -->
            <el-select v-model="questions.question.tag" style="margin-top: 10px;width: 20%;float: left;" multiple filterable
                allow-create default-first-option :reserve-keyword="false" placeholder="选择标签">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="uoloadQuestion">{{ btnName }}</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Question, TestSample } from '@/lib/types'
import { ElMessage } from 'element-plus';
import { questionStore } from '@/stores/questionStore';
import API from '@/plugins/axiosInstance';

let testSamples = reactive({
    testSample: {} as TestSample
})
let questions = reactive({
    question: {} as Question
})
const props = defineProps(['type'])
const isEdit = props.type == "edit" ? true : false
const qid = questionStore().$state.editQuestionId
const btnName = isEdit ? "修改" : "提交"
const options = [
    {
        value: 'HTML',
        label: 'HTML',
    },
    {
        value: 'CSS',
        label: 'CSS',
    },
    {
        value: 'JavaScript',
        label: 'JavaScript',
    },
]
const difficulty = [
    {
        value:'简单',
        label:'简单'
    },
    {
        value:'中等',
        label:'中等'
    },
    {
        value:'困难',
        label:'困难'
    },
    {
        value:'噩梦',
        label:'噩梦'
    },
]
const addInputSample = ref('')
const addOutputSample = ref('')
const addTestInputSample = ref('')
const addTestOutputSample = ref('')

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



/**
 * 增加样本
 * @param input 
 * @param output 
 */
const addSample = (input: string, output: string) => {
    testSamples.testSample.sampleInputArray.push(input)
    testSamples.testSample.sampleOutputArray.push(output)
}

const removeSample = (index: number) => {
    testSamples.testSample.sampleInputArray.splice(index, 1)
    testSamples.testSample.sampleOutputArray.splice(index, 1)
}

const uoloadQuestion = () => {
    if (isEdit) {
        changeQuestion()
    } else {
        addQuestion()
    }
}

const addQuestion = () => {
    API({
        url: '/addQuestion',
        method: 'post',
        data: questions.question
    }).then((res) => {
        showMsg(res)
    })
}

const changeQuestion = () => {
    questions.question.inputSample = JSON.stringify(questions.question.inputSample)
    questions.question.outputSample = JSON.stringify(questions.question.outputSample)
    questions.question.tag = JSON.stringify(questions.question.tag)
    testSamples.testSample.sampleInput = JSON.stringify(testSamples.testSample.sampleInputArray)
    testSamples.testSample.sampleOutput = JSON.stringify(testSamples.testSample.sampleOutputArray)
    questions.question.testSamples = testSamples.testSample
    API({
        url: '/changeQuestionInfo',
        method: 'post',
        data: questions.question
    }).then((res) => {
        showMsg(res)
    })
}

if (isEdit) {

    API({
        url: '/getQuestion/' + qid,
        method: 'get'
    }).then((res) => {
        questions.question = res.data.data
        questions.question.tag = JSON.parse(questions.question.tag)
        questions.question.outputSample = JSON.parse(questions.question.outputSample)
        questions.question.inputSample = JSON.parse(questions.question.inputSample)

    })

    API({
        url: '/getQuestionTestSample/' + qid,
        method: 'get'
    }).then((res) => {
        testSamples.testSample = res.data.data
        testSamples.testSample.sampleInputArray = JSON.parse(testSamples.testSample.sampleInput)
        testSamples.testSample.sampleOutputArray = JSON.parse(testSamples.testSample.sampleOutput)
        console.log(testSamples.testSample);

    })
}






/**
 * markdown中插入图片
 * @param event 
 * @param insertImage 
 * @param files 
 */
const handleUploadImage = (event: any, insertImage: any, files: File[]) => {
    let formData: any = new FormData()
    formData.append('file', files[0])
    console.log(files[0]);


    API({
        url: '/uploadImg',
        data: formData,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res) => {
        console.log(res);
        insertImage({
            url: res.data
        })
    })

}

</script>