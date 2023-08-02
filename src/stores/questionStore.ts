import {defineStore} from 'pinia'



export const questionStore = defineStore('question',{
    state:()=>{
        return {
            currentChoice:{
                id:0,
                questionName:'',
                inputStyle:'',
                outputStyle:'',
                inputSample:'',
                outputSample:'',
                dataRange:'',
                difficulty:'',
                timeLimit:0,
                memoryLimit:0,
                description:'',
                totalPass:0,
                totalAttempt:0,
                resource:'',
                tag:''
            },
            editQuestionId:'0'
        }
    },
    getters:{},
    actions:{
        // 设置当前选择的题目
        setCurrentChoice(data:any){
            this.currentChoice = data
        },
        setEditQuestionId(id:string){
            this.editQuestionId = id
        }

    },
    persist:{
        enabled:true
    }
})