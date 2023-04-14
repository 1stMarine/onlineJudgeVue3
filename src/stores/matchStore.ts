import {defineStore} from 'pinia'



export const matchStore = defineStore('match',{
    state:()=>{
        return {
            currentChoice:{
                id: '',
                matchName: '',
                matchDescription: '',
                createTime: '',
                startTime: '',
                endTime: '',
                persistentTime: '',
                participationCount: '',
                matchType: '',
                imgUrl: '',
                state: ''
            },
            
        }
    },
    getters:{},
    actions:{
        // 设置当前选择的竞赛
        setCurrentChoice(data:any){
            this.currentChoice = data
        }

    },
    persist:{
        enabled:true
    }
})