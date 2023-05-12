<template>
    <div ref="resolveCount" id="resolveCount" :style="{ width: '100%', height: '300px' }"></div>
</template>
   
<script setup lang="ts">
import API from '@/plugins/axiosInstance';
import { userStore } from '@/store';
import { getCurrentInstance, onMounted, ref } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
    // 得到解题数量
    API({
        url: '/getPerDifficultySolve/' + userStore().$state.user.id,
        method: 'get'
    }).then((res) => {
        const dom = document.getElementById('resolveCount');
        const resolveCount = echarts.init(dom); // 初始化echarts实例
        const option = {
            title: {
                text: '解题数量',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            color:["#95d475","#79bbff","#eebe77","#f89898"],
            series: [
                {
                    name: '解题数量(总计)',
                    type: 'pie',
                    radius: '50%',
                    data: res.data.data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        let datas = []

        // 设置实例参数
        resolveCount.setOption(option, true);
        // 解决多个图表自适应问题
        window.addEventListener("resize", () => {
            resolveCount && resolveCount.resize();
        });

    })


});



</script>