<template>
    <el-container>
        <el-aside width="20%">
            <noticeBoard></noticeBoard>

        </el-aside>
        <el-container style="min-height: 105vh;">
            <el-header>

            </el-header>
            <el-main>

                <el-card shadow="always" style="height: 100%" v-loading="matchLoading" element-loading-background="rgba(256, 256, 256, 1)" element-loading-text="正在拼命加载中...">
                    <div
                        class="h-48 md:h-56 lg:h-[24rem] w-full  border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">

                        <img :src="matchs.match.imgUrl"
                            class="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
                            alt="">

                        <div
                            class="absolute z-10 border-4 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500">
                        </div>

                    </div>
                    <div style="height: 150px;">
                        <el-row style="display: flex;">
                            <el-col :span="4" style="color:  #eebe77">
                                <h1>{{ matchs.match.matchName }}</h1>
                            </el-col>
                            <el-col :span="2">
                                <div v-show="matchs.match.state == '未开始'"> <el-tag type="success" size="large" class="mx-1"
                                        effect="dark">{{
                                            matchs.match.state }}</el-tag></div>
                                <div class="cardhead-items" v-show="matchs.match.state == '已开始'"> <el-tag type="danger"
                                        class="mx-1" effect="dark">{{ matchs.match.state }}</el-tag></div>
                                <div class="cardhead-items" v-show="matchs.match.state == '已结束'"> <el-tag type="info"
                                        class="mx-1" effect="dark">{{ matchs.match.state }}</el-tag></div>
                            </el-col>
                            <el-col :span="12">

                                <!-- 倒计时 -->
                                <el-countdown format="[比赛将在]DD [天] HH:mm:ss [后开始]" :value="value2" />

                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="20">
                                <h3 style="color: grey;">参与人数 : {{ matchs.match.participationCount }} 比赛时间 : {{
                                    matchs.match.startTime
                                }}开始, 持续 {{ matchs.match.persistentTime }}分钟</h3>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="primary" size="large" @click="participateMatch" :disabled="participated">{{
                                    participateBtn }}</el-button>
                            </el-col>
                        </el-row>
                    </div>

                    <el-tabs v-model="activeName" class="demo-tabs" style="margin-top: 20px;">
                        <el-tab-pane label="详情" name="first">
                            <Detials v-if="showDetial" :match="matchs.match" />
                        </el-tab-pane>
                        <el-tab-pane label="题目" name="second">
                            <questionList v-if="showDetial" :questions="matchs.match.questions"
                                :state="matchs.match.state" />
                        </el-tab-pane>
                        <el-tab-pane label="排名" name="third">
                            <rank />
                        </el-tab-pane>
                    </el-tabs>

                </el-card>
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
        <el-aside width="20%"></el-aside>
    </el-container>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue'
import API from '@/plugins/axiosInstance';
import dayjs from 'dayjs'
import Detials from './details.vue'
import questionList from './questionList.vue';
import { userStore } from '@/store/index'
import rank from './rank.vue'
import { ElNotification } from 'element-plus';
import { matchStore } from '@/stores/matchStore';
const activeName = "first"

const showDetial = ref(false)
const uid = userStore().$state.user.id
const matchLoading = ref(true)
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
                matchLoading.value = false
            }

        })
    }

}
const mid = matchStore().$state.currentChoice.id
API({
    url: '/getMatchDetail/' + mid,
    method: 'get'
}).then((res) => {
    matchs.match = reactive(res.data.data)
    if (matchs.match.state != "未开始") {
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
// 倒计时结束
const state = ref(matchStore().$state.currentChoice.state)



</script>
<style></style>