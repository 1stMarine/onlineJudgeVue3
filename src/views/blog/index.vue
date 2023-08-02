<template>
  <el-container>
    <el-aside width="20%">
      <noticeBoard></noticeBoard>

    </el-aside>
    <el-container style="min-height: 105vh;">
      <el-header>

      </el-header>
      <el-main>

        <el-card shadow="always" style="height: 100%">
          <BlogHeader />
          <!-- 搜索框 -->
          <!-- <el-input v-model="searchContent" placeholder="搜索内容回车确认" class="input-with-select" size="large"
            @keydown.enter="searchBlog" style="margin: 10px 0 10px 0;">
            <template #prepend>
              <el-button :icon="Search" />
            </template>
          </el-input> -->
          <el-divider />
          <div v-loading="blogListLoading">
            <blogCard v-for="blog in blogList" :blog="blog" />
          </div>

        </el-card>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
    <el-aside width="20%"></el-aside>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import blogCard from './components/blogCard.vue'
import BlogHeader from './components/BlogHeader.vue'
import API from '@/plugins/axiosInstance';
import { userStore } from '@/store';
import { useRoute } from 'vue-router';
import { Search } from '@element-plus/icons-vue'

const { params } = useRoute()
const searchContent = ref('')
const blogListLoading = ref(true)
const activeName = ref('first')
const blogList = ref<any>([])
let getBlogUrl = userStore().$state.isLogin ?
  '/getBlogList/0/10/' + userStore().$state.user.id + "/" + params.type :
  '/getBlogList/0/10/0/' + params.type


API({
  url: getBlogUrl,
  method: 'get'
}).then((res) => {
  blogList.value = res.data.data
  blogListLoading.value = false
})

const searchBlog = () => {
  blogListLoading.value = true
  let searchBlogUrl = userStore().$state.isLogin ?
    '/queryBlogByContent/' + searchContent.value + "/" + userStore().$state.user.id :
    '/queryBlogByContent/' + searchContent.value + "/" + 0
  API({
    url: searchBlogUrl,
    method: 'get'
  }).then((res) => {
    blogList.value = res.data.data
    blogListLoading.value = false
    console.log(blogList.value);
  })
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)

}
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
  