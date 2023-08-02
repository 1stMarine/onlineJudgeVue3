<template>
    <div class="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5" v-loading="userLoading"
        element-loading-background="rgba(256, 256, 256, 1)" element-loading-text="正在拼命加载中...">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">#</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">用户</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">密码(回车更改)</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">等级</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">地区</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">学校</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">标签</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">性别</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">简单题解</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">中等题解</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">困难题解</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">噩梦题解</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">角色</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">排名</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">粉丝</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">关注</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">签名</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">操作</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr class="hover:bg-gray-50" v-for="(user, index) in users">
                    <td class="px-2 py-2">#{{ index + 1 }}</td>

                    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="relative h-10 w-10">
                            <img class="h-full w-full rounded-full object-cover object-center" :src="user.url" alt="" />
                            <!-- 在线提示绿点 -->
                            <!-- <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> -->
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">{{ user.nickName }}</div>
                            <div class="text-gray-400">{{ user.email }}</div>
                        </div>
                    </th>
                    <td class="px-4 py-4">
                        <el-input style="width: 100px;" v-model="user.password" type="password" placeholder="回车更改密码"
                            show-password />
                    </td>
                    <td class="px-4 py-4">{{ user.level }}</td>
                    <td class="px-4  py-4">{{ user.location }}</td>
                    <td class="px-4  py-4">{{ user.school }}</td>
                    <td class="px-4  py-4">
                        <el-tag class="ml-2" v-for="tags in JSON.parse(user.tag)" type="info" style="margin-left: 5px;">{{
                            tags }}
                        </el-tag>
                    </td>
                    <td class="px-6 py-4">{{ user.gender }}</td>
                    <td class="px-6 py-4">{{ user.easyResolve }}</td>
                    <td class="px-6 py-4">{{ user.meddleResolve }}</td>
                    <td class="px-6 py-4">{{ user.hardResolve }}</td>
                    <td class="px-6 py-4">{{ user.nightmareResolve }}</td>
                    <td class="px-6 py-4">
                        <el-tag class="ml-2" :type="user.role == 'admin' ? 'success' : 'primary'"
                            style="margin-left: 5px;">{{ user.role }}</el-tag>

                    </td>
                    <td class="px-6 py-4">{{ user.rank }}</td>
                    <td class="px-6 py-4">{{ user.fans }}</td>
                    <td class="px-6 py-4">{{ user.subscribe }}</td>
                    <td class="px-6 py-4">{{ user.sign }}</td>
                    <td class="px-6 py-4">
                        <el-button :type="user.ban ? 'success' : 'danger'" @click="banUser(user.id, user.ban)">{{ user.ban ?
                            '解禁' : '封禁' }}</el-button>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
    <!-- 分页 -->
    <el-pagination class="pagination" background layout="prev, pager, next" :total="totalSize" :page-size="pageSize"
        @current-change="changePage" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { User } from '@/lib/types'
import API from '@/plugins/axiosInstance'
import { ElMessage } from 'element-plus';
const userLoading = ref(true)
let users = reactive<User[]>([

])
const totalSize = ref(0)
const pageSize = ref(15)
const page = ref(1)
const getUserList = () => {
    API({
        url: '/getUserList/' + page.value,
        method: 'get'
    }).then((res) => {
        users = res.data.data.userList
        totalSize.value = res.data.data.userCount
        userLoading.value = false
    })
}
getUserList()
// 改变页码
const changePage = (newPage: number) => {
    userLoading.value = true
    page.value = newPage
    // TODO: 分页的时候选择是搜索分页还是正常分页
    getUserList()
}
const banUser = (uid: string, ban: number) => {
    let form = new FormData()
    form.append('uid', uid)
    form.append('ban', ban === 1 ? '0' : '1')
    API({
        url: '/banUser',
        method: 'put',
        data: form
    }).then((res) => {
        showMsg(res.data.state, res.data.message)
    })
}
const showMsg = (state: number, message: string) => {
    if (state === 40001) {
        ElMessage({
            message: message,
            type: 'success'
        })
    } else {
        ElMessage.error(message)
    }
}
</script>