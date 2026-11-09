<template>
  <div class="chart">
    <div
      id="chart"
      class="monitorContainer"
      :class="chartOption.xAxisData.length > 0 ? 'show' : 'hidden'"
    />
    <empty-data-chart :is-empty="chartOption.xAxisData.length === 0" />
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import EmptyDataChart from '@/components/empty-data-chart/index.vue';
const props = defineProps({
  chartOption: {
    type: Object,
    default: () => {},
  },
});
// 定义变量
// 坐标轴颜色
const axisStyleColor1 = ref('#2c313a');
const axisStyleColor2 = ref('#a9aaae');
// 线的颜色
const lineStyleColor = ref('#d4af37');
// 渐变的颜色
const areaStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: 'rgba(212, 175, 55, 0.42)' },
  { offset: 0.3, color: 'rgba(212, 175, 55, 0.22)' },
  { offset: 1, color: 'rgba(212, 175, 55, 0)' },
]);
onMounted(() => {
  setOption();
});
const setOption = () => {
  const chartDom = document.getElementById('chart');
  const myChart = echarts.init(chartDom);
  let option = null;
  const grid = {
    left: '30',
    right: '33',
    top: '60',
    bottom: '5',
    containLabel: true,
  };
  nextTick(() => {
    setTimeout(() => {
      option = {
        title: {
          text: '销售额趋势图',
          left: 'center',
          top: '10',
          textStyle: {
            color: '#e9e6df',
            fontWeight: 'bolder',
            fontSize: 14,
          },
        },
        grid: grid,
        xAxis: {
          type: 'category',
          data: props.chartOption.xAxisData,
          axisLine: {
            lineStyle: {
              color: axisStyleColor1.value,
            },
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: axisStyleColor1.value,
            },
          },
          axisLabel: {
            align: 'center',
            color: axisStyleColor2.value,
          },
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          name: props.chartOption.yAxisName,
          nameTextStyle: {
            color: axisStyleColor2.value,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: axisStyleColor2.value,
          },
          splitLine: {
            lineStyle: {
              color: axisStyleColor1.value,
            },
          },
        },
        series: getSeriesOption(),
        // TODO：细节调整
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: axisStyleColor1.value,
              width: 2,
            },
          },
          formatter: '销售额：{c}<br />{b}',
          backgroundColor: '#1a1e25',
          borderColor: '#2c313a',
          borderWidth: 1,
          textStyle: {
            color: '#a9aaae',
          },
          padding: 12,
        },
      };
      myChart.setOption(option);
    }, 10);
  });
};
const getSeriesOption = () => {
  return [
    {
      type: 'line',
      data: props.chartOption.seriesData,
      smooth: true,
      lineStyle: {
        color: lineStyleColor.value,
        width: 3,
        shadowColor: 'rgba(212, 175, 55, 0.25)',
        shadowBlur: 10,
        shadowOffsetY: 8,
      },
      areaStyle: {
        color: areaStyleColor,
      },
    },
  ];
};
</script>