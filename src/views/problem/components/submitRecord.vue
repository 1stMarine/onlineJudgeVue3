<template>
    <el-table :data="tableData.record_list" stripe style="width: 100%;">
        <el-table-column prop="id" label="id" style="width: 5%;" />
        <el-table-column prop="userName" label="用户" style="width: 20%;" />
        <el-table-column prop="questionName" label="题目" style="width: 20%;">
            <template #default="scope">
                <el-button type="primary" @click="toProblemDetial(scope.row)" link>{{ scope.row.questionName }}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="language" label="语言" style="width: 20%;" />

        <el-table-column #default="scope" label="状态" style="width: 20%;">

            <el-tag v-show="scope.row.title == 'Accept'" type="success" disabled plain>Accept</el-tag>
            <el-tag v-show="scope.row.title != 'Accept'" type="danger" disabled plain>{{ scope.row.title }}</el-tag>

        </el-table-column>

        <el-table-column prop="address" label="操作" style="width: 15%;" #default="scope">
            <el-button type="primary" link @click="showRecordDetial(scope.row)">查看详情</el-button>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="编译记录详情" width="50%" destroy-on-close   v-if="dialogVisible" :visible.sync="dialogVisible">
        <el-descriptions :title="'No.' + recorddetial.qid" :column="3" border>
            <el-descriptions-item label="題目名" label-align="right" align="center" label-class-name="my-label"
                class-name="my-content" width="150px">{{ recorddetial.questionName }}</el-descriptions-item>
            <el-descriptions-item label="时间" label-align="right" align="center">{{ recorddetial.time }} s</el-descriptions-item>
            <el-descriptions-item label="空间" label-align="right" align="center">{{ recorddetial.memory }} mb</el-descriptions-item>

            <el-descriptions-item label="状态" label-align="right" align="center">
                <el-tag v-show="recorddetial.title == 'Accept'" type="success" disabled plain>Accept</el-tag>
                <el-tag v-show="recorddetial.title != 'Accept'" type="danger" disabled plain>{{ recorddetial.title }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="语言" label-align="right" align="center">
                {{ recorddetial.language }}
            </el-descriptions-item>
            <el-descriptions-item label="提交日期" label-align="right" align="center">
                {{ recorddetial.submitTime }}
            </el-descriptions-item>
            <el-descriptions-item label="信息"   label-align="right" align="center">
                <el-alert :title="recorddetial.message" :type="recorddetial.title == 'Accept' ? 'success' : 'error'" :closable="false" />
            </el-descriptions-item>
        </el-descriptions>
        <br/>
        <aceEditor :mode="'test'" :code="recorddetial.code" :testSample="recorddetial.testSample" :title="recorddetial.title"/>
        <template #footer>
            <span class="dialog-footer">

            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import API from '@/plugins/axiosInstance';
import emitter from "@/lib/bus";
import { userStore } from '@/store/index'
import { questionStore } from '@/stores/questionStore';
import { reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import aceEditor from '@/components/front/aceEditor.vue';
const props = defineProps(['uid', 'qid']);
const uid = userStore().$state.user.id
const qid = questionStore().$state.currentChoice.id
const router = useRouter()
const dialogVisible = ref(false)
userStore()
onMounted(() => {

    emitter.on('loadRecord', () => {
        // 用户登录的情况下得到他这道题目的编译记录
        const url = ref("/getSubmitRecords/" + uid + "/" + qid + "/1")
        // 用户未登录的情况下，得到全部
        if (props.uid != undefined) {
            return
        }
        console.log("uid", props.uid);

        API({
            url: url.value,
            method: 'get'
        }).then((res) => {
            tableData.record_list = res.data.data
        })

    });
})

const recorddetial = ref({
    code: '',
    qid: 0,
    language: '',
    memory: 0,
    message: '',
    questionName: '',
    submitTime: '',
    testSample: '',
    time: 0,
    title: '',
    userName: '',
    uid: 0,
})

const showRecordDetial = (detial: any) => {
    console.log(detial);
    recorddetial.value = detial

    
    dialogVisible.value = true
}

const tableData = reactive({
    record_list: []
})
const loadRecord = () => {

    let url = "/getSubmitRecords/" + uid + "/" + qid + "/1"
    if (props.uid == undefined) {
        return
    }else if(props.qid == undefined){
        url = "/getSubmitRecordsWithUid/" + uid + "/1"
    }


    console.log(props.uid);


    API({
        url: url,
        method: 'get'
    }).then((res) => {

        tableData.record_list = res.data.data
    })
}
loadRecord()
const toProblemDetial = (question: any) => {
    questionStore().setCurrentChoice(question)
    router.push({ name: 'problemDetial', query: { 'from': 'record' } })
}


</script>

<style scoped>
.my-label {
    background: var(--el-color-success-light-9);
}

.my-content {
    background: var(--el-color-danger-light-9);
}
</style>