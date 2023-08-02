<template>
    <el-container>
        <el-aside width="20%">
            <noticeBoard></noticeBoard>

        </el-aside>
        <el-container style="min-height: 105vh;">
            <el-header>

            </el-header>
            <el-main>

                <div>
                    <el-avatar shape="square" style="width: 100px;height: 100px;float: left;" :src="user.url" />
                    <div style="float: left;margin-left: 10px;">
                        <div style="font-size: 25px;margin: 5px;">
                            {{ user.nickName }}
                        </div>
                        <div style="margin: 5px;">
                            全站排名 : {{ user.rank }}
                        </div>
                        <div style="margin: 5px;">
                            等级 : {{ user.level }}
                        </div>
                    </div>


                </div>
                <div style="clear:both;"></div>
                <br>


                <el-row :gutter="0" style="width: 25%;float:left">
                    <el-col :span="24">
                        <el-card shadow="always" style="height: 800px;">
                            <div style="text-align: center;">
                                关注: {{ user.subscribe }}<el-divider direction="vertical" /> 粉丝: {{ user.fans }}<br><br>
                                <!-- 经验进度条 -->
                                <el-progress :stroke-width="20" :percentage="user.experience / (1000 * user.level) * 100"
                                    status="exception">
                                    <span style="font-size: 5px;color: grey">{{ user.experience }} / {{ 1000 * user.level
                                    }}</span>
                                </el-progress>
                                <br>
                                <!-- 修改个人简介 -->
                                <el-button type="success" plain style="width: 70%;"
                                    @click="dialogVisible = true">修改个人简介</el-button>
                                <el-dialog v-model="dialogVisible" title="修改个人信息" width="40%">

                                    <el-form :model="form" label-width="120px">
                                        <el-form-item label="头像预览">
                                            <img :src="form.url" />
                                        </el-form-item>
                                        <el-form-item label="个性签名">
                                            <el-input v-model="form.sign" maxlength="100"
                                                show-word-limit type="textarea" />
                                        </el-form-item>
                                        <el-form-item label="头像">
                                            <el-input style="width: 90%;" v-model="form.url" />
                                            <el-tooltip class="box-item" effect="dark"
                                                content="为节省服务器资源,请将图片上在线图床后使用url方式引用" placement="right">
                                                <el-icon style="width: 5%;">
                                                    <QuestionFilled style="width: 20px;height: 20px;" />
                                                </el-icon>
                                            </el-tooltip>
                                        </el-form-item>
                                        <el-form-item label="昵称">
                                            <el-input style="width: 90%;" v-model="form.nickName" />
                                        </el-form-item>
                                        <el-form-item label="性别">
                                            <el-select v-model="form.gender" placeholder="Select">
                                                <el-option value="男" label="男" />
                                                <el-option value="女" label="女" />
                                                <el-option value="保密" label="保密" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="学校">
                                            <el-input style="width: 90%;" v-model="form.school" />
                                        </el-form-item>
                                        <el-form-item label="地址">
                                            <el-input style="width: 90%;" v-model="form.location" />
                                        </el-form-item>
                                        <el-form-item label="擅长">
                                            <el-select v-model="form.tempTag" multiple filterable allow-create
                                                default-first-option :reserve-keyword="false" placeholder="选择你擅长的方向">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                                    :value="item.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="changeUserInfo">保存修改</el-button>
                                        </el-form-item>

                                    </el-form>
                                    <!-- doalog底部 -->
                                    <template #footer>
                                        <span class="dialog-footer">

                                        </span>
                                    </template>
                                </el-dialog>
                            </div>
                            <el-divider />
                            <div>
                                <span style="font-weight: bold;">个人简介</span><br><br>
                                <div class="info"> <el-icon>
                                        <EditPen />
                                    </el-icon>
                                    {{ user.sign }} </div>
                                <div class="info"> <el-icon>
                                        <Location />
                                    </el-icon> {{ user.location }} </div>
                                <div class="info"> <el-icon>
                                        <User />
                                    </el-icon> {{ user.gender }} </div>
                                <div class="info"> <el-icon>
                                        <School />
                                    </el-icon> {{ user.school }} </div>
                                <div class="info"> <el-icon>
                                        <StarFilled />
                                    </el-icon>
                                    <el-tag class="ml-2" v-for="tags in user.tag" type="info" style="margin-left: 5px;">{{
                                        tags }}
                                    </el-tag>
                                </div>
                            </div>
                        </el-card>
                    </el-col>



                </el-row>
                <el-row style="width: 70%;float:left">
                    <el-col :span="24" :offset="1">
                        <el-card shadow="always" style="height: 300px;">
                            <rankEcharts />
                        </el-card>
                    </el-col>
                    <el-col>
                        <el-row>
                            <el-col :span="10" :offset="1">
                                <el-card style="height: 300px;width: 118%;">
                                    <resolveCount />
                                </el-card>
                            </el-col>
                            <el-col :span="11" :offset="2">
                                <el-card style="height: 300px;width: 108%;">
                                    <resolveCount2 />
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24" :offset="1">
                        <el-card style="height: 300px">
                            <dailySubmitCount />
                        </el-card>
                    </el-col>
                    <el-col :span="24" :offset="1">
                        <el-card shadow="second" style="height: 600px">
                            <el-tabs v-model="activeTab">
                                <el-tab-pane label="提交记录" name="first">
                                    <submitRecord :uid="uid" />
                                </el-tab-pane>
                                <!-- <el-tab-pane label="发表解题" name="second">Config2</el-tab-pane>
            <el-tab-pane label="发表帖子" name="third">Config3</el-tab-pane> -->
                            </el-tabs>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
        <el-aside width="20%"></el-aside>
    </el-container>
</template>

<script setup lang="ts">
import { userStore } from '../../store'
import {
    Location,
    User,
    School,
    StarFilled,
    QuestionFilled,
    EditPen
} from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import rankEcharts from './components/rankEcharts.vue';
import resolveCount from './components/resolveCount.vue';
import resolveCount2 from './components/resolveCount2.vue';
import dailySubmitCount from './components/dailySubmitCount.vue';
import submitRecord from '../problem/components/submitRecord.vue';
import API from '@/plugins/axiosInstance';
import { ElNotification } from 'element-plus';
const uid = ref(userStore().$state.user.id)
const dialogVisible = ref(false)
const activeTab = "first"
onMounted(() => {
    emitter.emit(MittRouterNameSpace.ChangeRouter, "/user");
})
const user = ref(userStore().$state.user)
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
// do not use same name with ref
const form = reactive({
    id: user.value.id,
    nickName: user.value.nickName,
    location: user.value.location,
    school: user.value.school,
    url: user.value.url,
    gender: user.value.gender,
    tag: '',
    sign: user.value.sign,
    tempTag: user.value.tag
})

// 修改个人信息
const changeUserInfo = () => {

    form.tag = JSON.stringify(form.tempTag)
    API({
        url: '/changeUserInfo',
        data: form,
        method: 'post'
    }).then((res) => {
        // 如果更改成功
        if (res.data.state == 40001) {
            showMessage("成功", res.data.message, "success")
            setTimeout(() => {
                dialogVisible.value = false
                loadUserInof()
            }, 1000)
        } else {
            showMessage("失败", res.data.message, "error")
        }

    })
}

const loadUserInof = () => {
    API({
        url: '/loadUserInfo/' + uid.value,
        method: 'get'
    }).then((res) => {
        userStore().setUser(res.data.data)
        user.value = userStore().$state.user;
        location.reload()
        if (typeof user.value.tag != 'object') {
            user.value.tag = JSON.parse(user.value.tag)
        }
    })
}


const showMessage = (title: string, message: string, state: any) => {
    ElNotification({
        title: title,
        message: message,
        type: state,
    })

}

if (typeof user.value.tag != 'object') {
    user.value.tag = JSON.parse(user.value.tag)
}

// user.tag = JSON.parse(user.tag)


</script>

<style>
.el-col {
    margin-top: 10px;
}

.info {
    margin-top: 15px;
}
</style>