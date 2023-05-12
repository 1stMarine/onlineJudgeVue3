<template>
    <div ref="dailySubmit" id="dailySubmit" :style="{ width: '100%', height: '300px' }"></div>
</template>
   
<script setup lang="ts">
import API from '@/plugins/axiosInstance';
import { userStore } from '@/store';
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;


onMounted(() => {
    API({
        url: '/getUserDaySubmit/' + userStore().$state.user.id,
        method: 'get'
    }).then((res) => {
        const dom = document.getElementById('dailySubmit');
        const dailySubmit = echarts.init(dom); // 初始化echarts实例

        const option = {

            title: {
                top: 30,
                left: 'center',
                text: '提交热力图'
            },
            tooltip: {

            },
            visualMap: {
                pieces:[
                    {gte:10,color:"#529b2e"},
                    {gte:8,lte:10,color:"#95d475"},
                    {gte:5,lte:8,color:"#b3e19d"},
                    {gte:2,lte:5,color:"#d1edc4"},
                    {gte:0,lte:2,color:"#e1f3d8"},
                    {lte:0,color:"#f0f9eb"}
                ],
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                top: 65
            },
            calendar: {
                top: 120,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2023',
                itemStyle: {
                    borderWidth: 0.5
                },
                yearLabel: { show: true, nameMap: "ZH" },
                dayLabel: {
                    nameMap: ['日', '一', '二', '三', '四', '五', '六']
                },
                monthLabel: {
                    nameMap: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(198, 178, 178, 1)"
                    }
                }
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: res.data.data
            }
        };


        // 设置实例参数
        dailySubmit.setOption(option);
        // 解决多个图表自适应问题
        window.addEventListener("resize", () => {
            dailySubmit && dailySubmit.resize();
        });
    })


});



</script>