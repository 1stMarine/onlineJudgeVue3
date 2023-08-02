<template>
    <div>
        <h2 class="mb-4 text-2xl font-bold" style="float: left;width: 100%;">发布讨论</h2>
        <!-- 封面选择 -->
        <div style="margin-bottom: 10px;">
            选择封面
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

        <el-input v-model="blogContext.title" placeholder="此处输入标题" />

        <div>


            <!-- 标签选择 -->
            <el-select v-model="blogContext.tag" style="margin-top: 10px;width: 20%;float: left;" multiple filterable
                allow-create default-first-option :reserve-keyword="false" placeholder="选择标签">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="blogContext.type" class="m-2" placeholder="选择话题"
                style="float: left;margin-top: 10px;width: 20%;">
                <el-option label="#其他闲谈" value="#other"></el-option>
                <el-option label="#题解讨论" value="#question"></el-option>
                <el-option label="#技术杂谈" value="#technology"></el-option>
            </el-select>
            <button type="button" style="float: right;" publishBlog @click="publishBlog"
                class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                发 &nbsp;&nbsp; 布 <icon-writing-fluently theme="outline" size="24" :fill="['#ffffff', '#7ed321']"
                    style="float: right;margin-left: 5px;" />
            </button>
        </div>

        <!-- markdown编辑器 -->
        <v-md-editor v-model="blogContext.context" height="80%" :disabled-menus="[]"
            @upload-image="handleUploadImage"></v-md-editor>
    </div>
</template>
  
<script setup lang="ts">
import API from '@/plugins/axiosInstance';
import { Format } from '@icon-park/vue-next/es/map';
import { ref, reactive } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'
import { userStore } from '@/store';
import type { UploadProps } from 'element-plus'
const props = defineProps(['type', 'blog'])
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const isChangeEdit = ref(props.type == 'change')
const headers = {
    'Content-Type': 'multipart/form-data'
}

let blogContext = reactive({
    uid: '500',
    title: '',
    context: '',
    faceImage: '',
    type: '#other',
    tag: '',
})


if (isChangeEdit.value) {

    blogContext = props.blog
    blogContext.tag = JSON.parse(blogContext.tag)

}


// 发布讨论
const publishBlog = () => {
    blogContext.uid = userStore().$state.user.id
    blogContext.tag = JSON.stringify(blogContext.tag)

    API({
        url: '/uploadBlog',
        method: 'post',
        data: blogContext
    }).then((res) => {
        if (res.data.state == 40001) {
            location.reload()
            ElMessage({
                message: '发布成功!',
                type: 'success'
            })
        }
    })
}

// 超出限制
const exceed = (files: File[]) => {
    ElMessage.error('已有封面，请先删除.')
}
// 选择了文件
const handleChange = (file: UploadFile) => {

    let param = new FormData()
    param.append('file', file.raw)
    API({
        url: '/uploadImg',
        headers: headers,
        method: 'post',
        data: param
    }).then((res) => {
        blogContext.faceImage = res.data
        ElMessage({
            message: '封面上传成功.',
            type: 'success',
        })
    }).catch(err => {
        console.log(err);
    })
}

// 移除文件
const handleRemove = (file: UploadFile) => {
    let param = new FormData()

    param.append('fileName', blogContext.faceImage)


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



const text = ref('')
const title = ref('')
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
const blogTags = ref('')
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
  