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
            editeMatch:{
                mid:''
            }
        }
    },
    getters:{},
    actions:{
        // 设置当前选择的竞赛
        setCurrentChoice(data:any){
            this.currentChoice = data
        },
        setEditMatchId(id:string){
            this.editeMatch.mid = id
        }

    },
    persist:{
        enabled:true
    }
})