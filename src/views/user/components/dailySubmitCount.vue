<template>
    <div ref="dailySubmit" id="dailySubmit" :style="{ width: '100%', height: '300px' }"></div>
</template>
   
<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;


onMounted(() => {
    const dom = document.getElementById('dailySubmit');
    const dailySubmit = echarts.init(dom); // 初始化echarts实例

    const option = {
        title: {
            top: 30,
            left: 'center',
            text: '提交热力图'
        },
        tooltip: {},
        visualMap: {
            min: 0,
            max: 10,
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
            yearLabel: { show: false }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: []
        }
    };


    // 设置实例参数
    dailySubmit.setOption(option);
    // 解决多个图表自适应问题
    window.addEventListener("resize", () => {
        dailySubmit && dailySubmit.resize();
    });
});



</script>