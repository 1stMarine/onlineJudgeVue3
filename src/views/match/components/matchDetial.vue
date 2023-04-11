<template>
    <el-card class="box-card" style="width: 80%;position: absolute;">

        <div style="height: 150px;">
            <el-row style="display: flex;">
                <el-col :span="4" style="color:  #eebe77">
                    <h1>{{ matchs.match.matchName }}</h1>
                </el-col>
                <el-col :span="2">
                    <div v-show="matchs.match.state == '未开始'"> <el-tag type="success" size="large" class="mx-1"
                            effect="dark">{{
                                matchs.match.state }}</el-tag></div>
                    <div class="cardhead-items" v-show="matchs.match.state == '已开始'"> <el-tag type="danger" class="mx-1"
                            effect="dark">{{ matchs.match.state }}</el-tag></div>
                    <div class="cardhead-items" v-show="matchs.match.state == '已结束'"> <el-tag type="info" class="mx-1"
                            effect="dark">{{ matchs.match.state }}</el-tag></div>
                </el-col>
                <el-col :span="12">


                    <el-countdown format="[比赛将在]DD [天] HH:mm:ss [后开始]" :value="value2" />

                </el-col>
            </el-row>

            <el-row>
                <el-col :span="20">
                    <h3 style="color: grey;">参与人数 : {{ matchs.match.participationCount }} 比赛时间 : {{ matchs.match.startTime
                    }}开始, 持续 {{ matchs.match.persistentTime }}分钟</h3>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" size="large" @click="participateMatch" :disabled="participated">{{
                        participateBtn }}</el-button>
                </el-col>
            </el-row>
        </div>

        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="详情" name="first">
                <Detials v-if="showDetial" :match="matchs.match" />
            </el-tab-pane>
            <el-tab-pane label="题目" name="second">
                <questionList v-if="showDetial" :questions="matchs.match.questions" :state="matchs.match.state" />
            </el-tab-pane>
            <el-tab-pane label="排名" name="third">排名</el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue'
import API from '@/plugins/axiosInstance';
import dayjs from 'dayjs'
import Detials from './details.vue'
import questionList from './questionList.vue';
import { userStore } from '@/store/index'
import { method } from 'lodash';
import { ElNotification } from 'element-plus';
const activeName = "first"
const route = useRoute()
const id = route.query.id
const showDetial = ref(false)
const uid = userStore().$state.user.id

const participated = ref(false)
const participateBtn = ref("参加报名")

const participateMatch = () => {
    API({
        url: '/participateMatch/' + uid + "/" + matchs.match.id,
        method: 'get'
    }).then((res) => {

        if (res != undefined) {
            participateBtn.value = "报名成功"
            participated.value = true
            ElNotification({
                title: "成功!",
                message: "报名成功，记得按时来哟~~!",
                type: 'success',
            })
        }
    })
}
const loadParticipated = () => {
    if (uid != 0) {
        API({
            url: '/getUserMatch/' + uid,
            method: 'get'
        }).then((res) => {
            if (res != undefined) {
                res.data.data.forEach(element => {
                    if (element == matchs.match.id) {
                        participateBtn.value = "报名成功"
                        participated.value = true
                        return
                    }
                });
            }

        })
    }

}

API({
    url: '/getMatchDetail/' + id,
    method: 'get'
}).then((res) => {
    matchs.match = reactive(res.data.data)
    if(matchs.match.state != "未开始"){
        participateBtn.value = "不在报名时间"
        participated.value = true
    }
    value2.value = dayjs(matchs.match.startTime)
    showDetial.value = true
    loadParticipated()
})
const matchs = reactive({
    match: {
        id: 0,
        matchName: '',
        matchDescription: '',
        creatTime: '',
        startTime: '',
        endTime: '',
        persistentTime: 0,
        participationCount: 0,
        matchType: '',
        imgUrl: '',
        state: '',
        questionIds: [],
        questions: []
    }
})
const value2 = ref(dayjs('2023-03-01 09:30'))

</script>
<style></style>