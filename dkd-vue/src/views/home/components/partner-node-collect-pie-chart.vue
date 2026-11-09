<template>
  <div id="chartTop" ref="EcharRef" class="monitorContainer"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
const width = ref('100%');
const height = ref('300px');
const chart = ref('chart');
const EcharRef = ref(null);
// 获取父组件数据
const props = defineProps({
  chartOption: {
    type: Object,
    default: () => ({}),
  },
});
onMounted(() => {
  setOption();
});
const setOption = () => {
  const chartDom = document.getElementById('chartTop');
  const myChart = echarts.init(chartDom);
  let option = null;
  nextTick(() => {
    setTimeout(() => {
      option = {
        // TODO：细节调整，小圈，阴影，线的长度...
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br />总占比：{d}%',
          backgroundColor: '#1a1e25',
          borderColor: '#2c313a',
          borderWidth: 1,
          textStyle: {
            color: '#a9aaae',
          },
          padding: 12,
        },
        label: {
          formatter: ['{name|{b}}', '{percentage|{d}%}'].join('\n'),
          rich: {
            name: {
              color: '#e9e6df',
              fontWeight: 'bolder',
              align: 'left',
            },
            percentage: {
              color: '#e9e6df',
              lineHeight: 15,
              align: 'left',
            },
          },
        },
        labelLine: {
          lineStyle: {
            color: '#74777e',
          },
        },
        series: [
          {
            type: 'pie',
            roseType: 'radius',
            radius: [33, 100],
            center: ['50%', '50%'],
            data: props.chartOption.seriesData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
          },
        ],
        color: ['#d4af37', '#f0d998', '#b8912a', '#8a6d20', '#c9a227'],
      };
      myChart.setOption(option);
    }, 10);
  });
};
</script>
