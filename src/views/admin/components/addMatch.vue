<template>
    <el-form :model="form" label-width="120px">
        <el-form-item label="封面预览">
            <img :src="form.imgUrl" />
        </el-form-item>
        <el-form-item label="封面Url路径">
            <el-input v-model="form.imgUrl" placeholder="不填写将提供默认图片" />
        </el-form-item>
        <el-form-item label="竞赛名">
            <el-input v-model="form.matchName" />
        </el-form-item>
        <el-form-item label="开始时间">
            <el-col :span="11">
                <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间" style="width: 100%"  value-format="YYYY-MM-DD HH:mm"  format="YYYY-MM-DD HH:mm"/>
            </el-col>
            <el-col :span="2" class="text-center" style="text-align: center;">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-date-picker type="datetime" v-model="form.endTime" placeholder="选择结束时间" style="width: 100%" value-format="YYYY-MM-DD HH:mm"  format="YYYY-MM-DD HH:mm" />
            </el-col>
            <el-col :span="11">
                竞赛将持续 {{ form.persistentTime }} 分钟
            </el-col>
        </el-form-item>

        <el-form-item label="题目选择">
            <el-select-v2 v-model="form.questionIds" filterable :options="tableData" placeholder="Please select" style="width: 240px"
                multiple />
        </el-form-item>

        <el-form-item label="私密(未开发完成)">
            <el-switch disabled v-model="form.privat" />
        </el-form-item>
        <el-form-item label="竞赛类型介绍">
            <el-input v-model="form.matchType" type="textarea" />
        </el-form-item>
        <el-form-item label="竞赛简介">
            <el-input v-model="form.matchDescription" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import API from '@/plugins/axiosInstance';
import { reactive, computed, ref } from 'vue'
import { matchStore } from '@/stores/matchStore';

const props = defineProps(['type']);
const type = props.type
const editMatchId = matchStore().$state.editeMatch.mid





// do not use same name with ref
const form = ref({
    matchName: '',
    startTime: '2023-03-01 04:00',
    endTime: '2023-03-01 04:30',
    privat: false,
    matchDescription: '',
    matchType: '',
    persistentTime: 0,
    imgUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.lJ56d_wucWCXO5ZOPOYySAHaFP?w=248&h=180&c=7&r=0&o=5&pid=1.7',
    questionIds:[]
})



if(type == "edit"){
    API({
        url:'/getMatchDetail/'+editMatchId,
        method:'get'
    }).then((res)=>{
        form.value = res.data.data
        // TODO: 题目列表无法同步 
        console.log(form.value);
    })
    
    
}
form.value.persistentTime = ref(computed<any>(() => {
    var eventStartTime = new Date(form.value.startTime);
    var eventEndTime = new Date(form.value.endTime);
    var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
    return duration / 60000
}))


// 问题难度选择
const tableData = reactive<Array<any|undefined>>([
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

const formatSelect = (arr:any,index:number)=>{
    arr.forEach(element => {
           tableData[index].options.push({
            value:element.id,
            label:element.questionName
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
            formatSelect(element,index++)
        });


    })
}


getQuestionList()

const onSubmit = () => {
    API({
        url: '/addMatch',
        data:form.value,
        method: 'post'
    }).then((res) => {
        console.log(res);
    })

}
</script>