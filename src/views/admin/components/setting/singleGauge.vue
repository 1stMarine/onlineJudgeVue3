<template>
    <div>
        <div ref="gauge" class="chart" style="height: 200px;width: 200px;"></div>
    </div>
</template>
    
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';


const gauge = ref<HTMLElement | null>(null);
const chart = ref<echarts.ECharts | null>(null)

let props = defineProps(['data','name'])
let data = ref(props.data)
let name = ref(props.name)


watch(() => props.data, (newValue: number) => {

    if (!newValue) {
        newValue = 0
    }
    // 设置参数
    const options = {
        series: [
            {
                type: 'gauge',
                detail: { formatter: '{value}%', textStyle: { fontSize: 10 } },
                data: [{ value: newValue }],
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: [
                            [0.3, '#5FB878'],  // 低值颜色
                            [0.6, '#FFB800'],  // 中值颜色
                            [1, '#FF5722']     // 高值颜色
                        ]
                    }
                },
                axisTick: {
                    lineStyle: { color: 'auto' }
                },
                splitLine: { length: 1, lineStyle: { color: 'auto' } },
                pointer: { width: 2 },
                animationDuration: 2000,

            },

        ],
        graphic: [
            {
                type: 'text',
                left: 'center',
                top: '80%', // 调整位置到仪表下方
                style: {
                    text: name.value,
                    fontSize: 12
                }
            }
        ]
    };
    chart.value!.setOption(options)

})

onMounted(() => {

    if (gauge.value) {
        chart.value = echarts.init(gauge.value)
        // 设置参数
        const options = {
            series: [
                {
                    type: 'gauge',
                    detail: { formatter: '{value}%', textStyle: { fontSize: 10 } },
                    data: [{ value: data }],
                    axisLine: {
                        lineStyle: {
                            width: 2,
                            color: [
                                [0.3, '#5FB878'],  // 低值颜色
                                [0.6, '#FFB800'],  // 中值颜色
                                [1, '#FF5722']     // 高值颜色
                            ]
                        }
                    },
                    axisTick: {
                        lineStyle: { color: 'auto' }
                    },
                    splitLine: { length: 1, lineStyle: { color: 'auto' } },
                    pointer: { width: 2 },
                    animationDuration: 2000,

                },

            ],
            graphic: [
                {
                    type: 'text',
                    left: 'center',
                    top: '80%', // 调整位置到仪表下方
                    style: {
                        text: name.value,
                        fontSize: 12
                    }
                }
            ]
        };

        chart.value.setOption(options);
    }

})



</script>
    
<style scoped></style>
    