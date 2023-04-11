<template>
    <div ref="resolveCount" id="resolveCount" :style="{ width: '100%', height: '300px' }"></div>
</template>
   
<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
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
        series: [
            {
                name: '解题数量',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '简单'},
                    { value: 735, name: '中等' },
                    { value: 580, name: '困难' },
                    { value: 484, name: '噩梦' },
                ],
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

    // 设置实例参数
    resolveCount.setOption(option);
    // 解决多个图表自适应问题
    window.addEventListener("resize", () => {
        resolveCount && resolveCount.resize();
  });
});



</script>