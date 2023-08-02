<template>
    <el-form :model="form" label-width="120px" v-loading="loadingImg">
        <el-form-item label="封面预览">
            <!-- 封面选择 -->

            <div style="margin-bottom: 10px;">
                选择封面
                <img v-show="isEdit" class="el-upload-list__item-thumbnail" :src="form.imgUrl" alt="" />

                <el-upload action="#" list-type="picture-card" :auto-upload="false" limit="1" :fileList="fileList"
                    :on-exceed="exceed" :on-change="handleChange">
                    <el-icon>
                        <Plus />
                    </el-icon>

                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <el-icon><zoom-in /></el-icon>
                                </span>

                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>

            </div>
        </el-form-item>
        <el-form-item label="竞赛名">
            <el-input v-model="form.matchName" />
        </el-form-item>
        <el-form-item label="开始时间">
            <el-col :span="11">
                <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间" style="width: 100%"
                    value-format="YYYY-MM-DD HH:mm" format="YYYY-MM-DD HH:mm" />
            </el-col>
            <el-col :span="2" class="text-center" style="text-align: center;">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-date-picker type="datetime" v-model="form.endTime" placeholder="选择结束时间" style="width: 100%"
                    value-format="YYYY-MM-DD HH:mm" format="YYYY-MM-DD HH:mm" />
            </el-col>
            <el-col :span="11">
                竞赛将持续 {{ form.persistentTime }} 分钟
            </el-col>
        </el-form-item>

        <el-form-item label="题目选择">
            <el-select-v2 v-model="form.questionIds" filterable :options="tableData" placeholder="Please select"
                style="width: 240px" multiple />
        </el-form-item>

        <!-- <el-form-item label="私密(未开发完成)">
            <el-switch disabled v-model="form.privat" />
        </el-form-item> -->
        <el-form-item label="竞赛简介">
            <!-- markdown编辑器 -->
            <v-md-editor v-model="form.matchDescription" height="500px" :disabled-menus="[]"
                @upload-image="handleUploadImage"></v-md-editor>

        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ submitBtnName }}</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { reactive, computed, ref, toRaw } from 'vue'
import { matchStore } from '@/stores/matchStore';
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

const props = defineProps(['type']);
const type = props.type
const editMatchId = matchStore().$state.editeMatch.mid
const fileList = ref([])
const headers = {
    'Content-Type': 'multipart/form-data'
}
const dialogVisible = ref(false)
const disabled = ref(false)
const dialogImageUrl = ref('')
const isEdit = ref(type == "edit" ? true : false)
const submitBtnName = isEdit ? "修改" : "创建"
const currentDate = new Date();
const loadingImg = ref(false)
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");
const hours = String(currentDate.getHours()).padStart(2, "0");
const minutes = String(currentDate.getMinutes()).padStart(2, "0");
const seconds = String(currentDate.getSeconds()).padStart(2, "0");




// do not use same name with ref
const form = ref({
    matchName: '',
    startTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    endTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    privat: false,
    matchDescription: '',
    matchType: '',
    persistentTime: 0,
    imgUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.lJ56d_wucWCXO5ZOPOYySAHaFP?w=248&h=180&c=7&r=0&o=5&pid=1.7',
    questionIds: []
})

if (isEdit) {
    API({
        url: '/getMatchDetail/' + editMatchId,
        method: 'get'
    }).then((res) => {
        form.value = toRaw(res.data.data)

    })


}
const onSubmit = () => {
    if (isEdit) {
        API({
            url: '/updateMatch',
            data: form.value,
            method: 'post'
        }).then((res) => {
            if (res.data.state == 40001) {
                ElMessage({
                    message: res.data.message,
                    type: 'success'
                })
                location.reload()
            } else {
                ElMessage.error(res.data.message)
            }
        })
    } else {
        API({
            url: '/addMatch',
            data: form.value,
            method: 'post'
        }).then((res) => {
            ElMessage({
                message: res.data.message,
                type: 'success'
            })
            location.reload()
        })
    }



}



// 超出限制
const exceed = (files: File[]) => {
    ElMessage.error('已有封面，请先删除.')
}
// 选择了文件
const handleChange = (file: UploadFile) => {
    loadingImg.value = true
    let param = new FormData()
    param.append('file', file.raw)
    API({
        url: '/uploadImg',
        headers: headers,
        method: 'post',
        data: param
    }).then((res) => {
        form.value.imgUrl = res.data
        ElMessage({
            message: '封面上传成功.',
            type: 'success',
        })
        isEdit.value = false
        loadingImg.value = false
    }).catch(err => {
        console.log(err);
    })
}

// 移除文件
const handleRemove = (file: UploadFile) => {
    let param = new FormData()

    param.append('fileName', form.value.imgUrl)


    API({
        url: '/deleteImg',
        method: 'post',
        headers: headers,
        data: param
    }).then((res) => {
        fileList.value = []
        ElMessage({
            message: '删除成功.',
            type: 'success',
        })
    })

}
// 显示略缩图
const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
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



form.value.persistentTime = ref(computed<number>(() => {
    var eventStartTime = new Date(form.value.startTime);
    var eventEndTime = new Date(form.value.endTime);
    var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
    return duration / 60000
}))


// 问题难度选择
const tableData = reactive<Array<any | undefined>>([
    {
        label: '简单',
        options: []
    },
    {
        label: '中等',
        options: []
    },
    {
        label: '困难',
        options: []
    },
    {
        label: '噩梦',
        options: []
    },
])

const formatSelect = (arr: any, index: number) => {
    arr.forEach(element => {
        tableData[index].options.push({
            value: element.id,
            label: element.questionName
        })
    });
}

const getQuestionList = () => {
    API({
        url: '/getQuestionSelect',
        method: 'post'
    }).then((res) => {
        let index = 0;
        res.data.data.forEach(element => {
            formatSelect(element, index++)
        });


    })
}


getQuestionList()




</script>