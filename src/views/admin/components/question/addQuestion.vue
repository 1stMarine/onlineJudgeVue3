<template>
  <el-upload v-model:file-list="fileList" class="upload-demo" action="/api/uploadQuestion" accept=".xml" multiple
    :headers="headers" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="100"
    :on-exceed="handleExceed">
    <el-button type="primary">选择文件并上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        .xml文件 500kb以内
      </div>
      上传列表:
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userStore } from '@/store';
import type { UploadProps, UploadUserFile } from 'element-plus'



const headers = {
  token: userStore().$state.user.token
}

const fileList = ref<UploadUserFile[]>([

])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 100, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>
  