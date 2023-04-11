<template>
    <div ref="myChart" id="myChart" :style="{ width: '100%', height: '300px' }"></div>
</template>
   
<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
    const dom = document.getElementById('myChart');
    const myChart = echarts.init(dom); // 初始化echarts实例
    const option = {
        title: {
            text: '全站排名(年度)'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月']
        },
        yAxis: {
            type: 'value',
            show: false
        },
        grid: {
            show: false
        },
        series: [
            {
                data: [820, 932, 901],
                type: 'line',
                smooth: true,
                symbolSize: 6,
                label: {
                    show: true,
                    color: "rgba(0, 0, 0, 1)",
                    borderWidth: 1,
                    borderColor: "rgba(98, 93, 93, 0.5)",
                    borderType: "solid",
                    padding: [5, 5, 5, 5],
                    borderRadius: [6, 6, 6, 6]
                },
                itemStyle: {
                    color: "rgba(98, 93, 93, 0.5)"
                },
                lineStyle: {
                    color: "rgba(255, 226, 6, 1)"
                }
            }
        ]
    };
    // 设置实例参数
    myChart.setOption(option);
    // 解决多个图表自适应问题
    window.addEventListener("resize", () => {
        myChart && myChart.resize();
    });
});



</script>