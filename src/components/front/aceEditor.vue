<template>
    <div class="ace-container">
        <!-- 设置按钮 -->
        <el-avatar style="float: right;" @click="toggleConfigPanel" :size="50" src="data:image/jpeg;base64,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" />
        <div style="clear: both;"></div>
        <div class="ace-editor" ref="ace"></div>
        <transition name='slide-fade'>
            <div class="config-panel" v-show="toggle">
            <div>
                <div class="item">
                    <label class="title">语言</label>
                    <el-select class="value" v-model="modePath" @change="handleModelPathChange" size="default"
                        value-key="name">
                        <el-option v-for="mode in modeArray" :key="mode.name" :label="mode.name" :value="mode.path">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <label class="title">主题</label>
                    <el-select class="value" v-model="themePath" @change="handleThemeChange" size="default" value-key="name">
                        <el-option v-for="theme in themeArray" :key="theme.name" :label="theme.name" :value="theme.path">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <label class="title">换行</label>
                    <el-select class="value" v-model="wrap" @change="handleWrapChange" size="default" value-key="name">
                        <el-option v-for="wrap in wrapArray" :key="wrap.name" :label="wrap.name" :value="wrap.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <label class="title">字体大小</label>
                    <el-input-number v-model="fontSize" :step="1" @change="handleFontSizeChange" />
                </div>
            </div>
        </div>

        </transition>
        
        <!-- <div class="bookmarklet" @click="toggleConfigPanel"></div> -->
    </div>
    <br>
    <el-row class="mb-9">
        <el-button type="primary" @click="judge" :loading="submiting" style="float: left;">提交代码</el-button>
        <!-- <el-button type="success">运行测试</el-button> -->
        <el-steps v-show="showProcess" :space="200" :active="infoIndex" finish-status="success" style="width: 80%;" :align-center="true">
            <el-step :title="stepInfoMsg[0]" />
            <el-step :title="stepInfoMsg[1]"  />
            <el-step :title="stepInfoMsg[2]"  />
            <el-step :title="stepInfoMsg[3]"  />
            <el-step :title="stepInfoMsg[4]"  />
        </el-steps>
    </el-row>
    <br>
    <!-- 提示 -->
    <el-alert v-show="isError" :title="underMessage" type="error" :closable="false" />
    <el-alert v-show="isCorrect" :title="underMessage" type="success" :closable="false" />
    <br>
    <!-- 错误数据提示 -->
    <el-card class="box-card" v-show="isError">
        <template #header>
            <div class="card-header">
                <span>错误数据如下</span>
            </div>
        </template>
        输入 : <el-input v-model="input" /> <br><br>
        输出 : <el-input disabled v-model="output" /> <br><br>
        答案 : <el-input disabled v-model="answer" /> <br><br>
    </el-card>
</template>
   
<script>
import ace from 'ace-builds'
// 高亮
import 'ace-builds/src-noconflict/snippets/c_cpp'
import 'ace-builds/src-noconflict/snippets/python'
import 'ace-builds/src-noconflict/snippets/golang'
import 'ace-builds/src-noconflict/snippets/java'
// 主题
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-eclipse'
import  emitter from "@/lib/bus";
// 代码补全
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/mode-java'
import { Promotion } from '@element-plus/icons-vue'
import { ref , defineProps } from 'vue'
import API from '@/plugins/axiosInstance';
import { ElNotification } from 'element-plus'
import {userStore} from '../../store'
import {judgerStore} from '@/stores/judgerStore'
import {questionStore} from '@/stores/questionStore'

import {matchStore} from '@/stores/matchStore'
import {
        Document,
        Menu as IconMenu,
        UserFilled,
        Medal,
        Files,
        QuestionFilled,
        DataLine,
        FolderAdd,
        Setting,
        } from '@element-plus/icons-vue'
import {socket} from '@/plugins/socket'


        //  主题
const themeArray = [{
  name: 'monokai',
  path: 'ace/theme/monokai'
},
{
  name: 'chrome',
  path: 'ace/theme/chrome'
},
{
  name: 'eclipse',
  path: 'ace/theme/eclipse'
},
{
  name: 'terminal',
  path: 'ace/theme/terminal'
},
{
  name: 'xcode',
  path: 'ace/theme/xcode'
},
{
  name: 'github',
  path: 'ace/theme/github'
}]      
//      换行
const wrapArray = [{
    name: '开启',
    value: true
}, {
    name: '关闭',
    value: false
}]
        // 高亮、代码提示
const modeArray = [{
    name: 'Cpp_C',
    path: 'ace/mode/c_cpp'
}, {
    name: 'Python',
    path: 'ace/mode/python'
}, {
    name: 'Go',
    path: 'ace/mode/golang'
}, {
    name: 'Java',
    path: 'ace/mode/java'
}]
export default {
    setup(props) {
        let isError = ref(false)
        let input = ref("还没有输入")
        let output = ref("没有代码运行")
        let answer = ref("没有代码运行")
        let isCorrect = ref(false)
        let underMessage = ref('')
        let submiting = ref(false)
        
        let uid = ref(userStore().$state.user.id)
        let userName = ref(userStore().$state.user.nickName)
        let qid = ref(questionStore().$state.currentChoice.id)
        let questionName = ref(questionStore().$state.currentChoice.questionName)
//      代码编译类型 = 比赛:101 , 普通:100
        let type = ref(judgerStore().$state.type)

        let stepInfoMsg = ref(["等待提交","初始化...","编译中...","运行中...","等待结果"])
        let stepDoneMsg = ref(["提交完成","初始化完毕","编译完毕","运行完毕","测试完成"])
        let infoIndex = ref(0)
        let showProcess = ref(false)

        // webcoket
        socket.ws_url = socket.base_url + "?id=" + uid.value
        socket.init()
        socket.websock.onmessage = function reacevie(e) {
            let state = JSON.parse(e.data);
  
            let index = state.code
            infoIndex.value = index
            stepInfoMsg.value[index-1] = stepDoneMsg.value[index-1]
        }
        return {
            input,
            output,
            answer,
            isError,
            submiting,
            isCorrect,
            underMessage,
            uid,
            qid,
            userName,
            questionName,
            infoIndex,
            stepInfoMsg,
            stepDoneMsg,
            showProcess,
            type
        }
    },
    props: {
        uid:Number,
        qid:String,
        userName:String,
        questionName:String
    },
    mounted() {
        // 初始化aceEditor
        this.aceEditor = ace.edit(this.$refs.ace, {
            maxLines: 35,
            minLines: 30,
            fontSize: 14,
            value: this.value ? this.value : '',
            theme: this.themePath,
            mode: this.modePath,
            wrap: this.wrap,
            tabSize: 4
        })
        // 激活自动提示
        this.aceEditor.setOptions({
            enableSnippets: true,
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true
        })
        this.aceEditor.getSession().on('change', this.change)
    },
    data() {
        return {
            // aceEditor初始化参数
            aceEditor: null,
            toggle: false,
            wrap: true,
            fontSize: 14,
            themePath: 'ace/theme/monokai',
            modePath: 'ace/mode/c_cpp',
            modeName: 'Cpp_c',
            modeArray: modeArray,
            wrapArray: wrapArray,
            themeArray: themeArray
        }
    },
    methods: {
        // 提交请求
        judge() {
            console.log(matchStore().$state.currentChoice.id);
            this.showProcess = ref(true)
            this.isError = false
            this.submiting = true
            // 提交内容
            console.log(this.type);
            let judgeData = {
                code:this.aceEditor.getSession().getValue(),
                uid:this.uid,
                qid:this.qid,
                userName:this.userName,
                questionName:this.questionName,
                language:this.modeName,
                type:this.type,
                mid:matchStore().$state.currentChoice.id
            }
            // 发送判题请求
            API({
                url: '/judge',
                data: judgeData,
                method: 'post'
            }).then((res) => {
                this.submiting = false
                if(res == undefined){
                    return;
                }
                if(res.data.state != 40002){
                    // 重新加载编译记录
                    emitter.emit('loadRecord')
                }
                ElNotification({
                    title: res.data.data.title,
                    message: res.data.data.message,
                    type: res.data.data.pass ? 'success' : 'error',
                })

                this.underMessage = ref(res.data.data.message)
                if(!res.data.data.pass){
                    // 失败
                    this.isCorrect = false
                    this.isError = true
                    this.input = res.data.data.testSample == null ? " " : res.data.data.testSample.input 
                    this.output = res.data.data.testSample == null ? " " : res.data.data.testSample.userOutput 
                    this.answer = res.data.data.testSample == null ? " " : res.data.data.testSample.output 
                }else{
                    // 成功
                    this.infoIndex= 5
                    this.stepInfoMsg[4] = this.stepDoneMsg[4]
                    this.isCorrect = true
                    this.isError = false
                }
            },(reason) => {
            })
        },
        // 弹出设置窗口
        toggleConfigPanel() {
            this.toggle = !this.toggle
        },
        change() {
            this.$emit('input', this.aceEditor.getSession().getValue())
        },
        // 改变代码补全
        handleModelPathChange(modelPath) {
            this.aceEditor.getSession().setMode(modelPath)
            this.modeName = modelPath.split('/')[2]
        },
        // 换行
        handleWrapChange(wrap) {
            this.aceEditor.getSession().setUseWrapMode(wrap)
        },
        // 改变主题
        handleThemeChange(theme){
            this.aceEditor.setTheme(theme)
        },
        // 改变字体大小
        handleFontSizeChange(size){
            this.aceEditor.setFontSize(size)
        }
    }
}


</script>
  
<style lang='scss' scoped>
.ace-container {
    position: relative;

    .config-panel {
        position:absolute;
        right: 0;
        bottom: 0;
        width: 25%;
        height: 90%;
        background-color: rgba(128,128,128,0.2);
        z-index: 1;

        .item {
            margin: 10px auto;
            text-align: center;
            margin-top: 50px;
            .title {
                color: white;
                margin: 0 10px;
                font-size: 14px;
            }
        }
    }

    .bookmarklet {
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        z-index: 2;
        cursor: pointer;
        border-width: 9px;
        border-style: solid;
        border-color: lightblue gray gray rgb(206, 173, 230);
        border-image: initial;
    }

}

//开始过度
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
  