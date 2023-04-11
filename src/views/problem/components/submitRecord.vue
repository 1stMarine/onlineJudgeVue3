<template>
    <el-table :data="tableData.record_list" stripe style="width: 100%;">
        <el-table-column prop="id" label="id" style="width: 5%;"/>
        <el-table-column prop="userName" label="用户" style="width: 20%;" />
        <el-table-column prop="questionName" label="题目" style="width: 20%;" />
        <el-table-column prop="language" label="语言" style="width: 20%;" />

        <el-table-column #default="scope" label="状态" style="width: 20%;">

            <el-tag v-show="scope.row.title == 'Accept'" type="success" disabled plain>Accept</el-tag>
            <el-tag v-show="scope.row.title != 'Accept'" type="danger" disabled plain>{{ scope.row.title }}</el-tag>

        </el-table-column>

        <el-table-column prop="address" label="操作" style="width: 15%;">
            <el-button type="primary" link @click="dialogVisible = true">查看详情</el-button>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="编译记录详情" width="50%">
        <el-descriptions title="Customized style list" :column="3" border>
            <el-descriptions-item label="Username" label-align="right" align="center" label-class-name="my-label"
                class-name="my-content" width="150px">kooriookami</el-descriptions-item>
            <el-descriptions-item label="Telephone" label-align="right" align="center">18100000000</el-descriptions-item>
            <el-descriptions-item label="Place" label-align="right" align="center">Suzhou</el-descriptions-item>
            <el-descriptions-item label="Remarks" label-align="right" align="center">
                <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Address" label-align="right" align="center">No.1188, Wuzhong Avenue, Wuzhong
                District, Suzhou, Jiangsu
                Province</el-descriptions-item>
        </el-descriptions>
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
import { reactive, onMounted, onUnmounted } from 'vue';
const props = defineProps(['uid', 'qid']);
const uid = props.uid
const qid = props.qid
const dialogVisible = ref(false)
userStore()
onMounted(() => {
    emitter.on('loadRecord', () => {
        const url = "/getSubmitRecords/" + uid + "/" + qid + "/1"
        API({
            url: url,
            method: 'get'
        }).then((res) => {
            tableData.record_list = res.data.data
        })

    });
})

const tableData = reactive({
    record_list: []
})
const loadRecord = () => {
    let url = "/getSubmitRecordsWithQid/" + qid + "/1"
    if (userStore().$state.isLogin) {
        if(qid != undefined){
            url = "/getSubmitRecords/" + uid + "/" + qid + "/1"
        }else{
            url = "/getSubmitRecordsWithUid/" + uid + "/1"
        }
    }
    API({
        url: url,
        method: 'get'
    }).then((res) => {
        tableData.record_list = res.data.data
    })
}
loadRecord()



</script>

<style scoped>
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
</style>